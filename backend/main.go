package main

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Substance struct {
	ID              int      `json:"id"`
	Name            string   `json:"name"`
	Formula         string   `json:"formula"`
	Image           string   `json:"image"`
	Type            string   `json:"type"`
	MolarMass       float64  `json:"molar_mass"`
	StateAtRoomTemp string   `json:"state_at_room_temp"`
	Uses            []string `json:"uses"`
	Hazards         []string `json:"hazards"`
	Description     string   `json:"description"`
}

type SearchResult struct {
	Query       string      `json:"query"`
	Category    string      `json:"category"`
	Description string      `json:"description"`
	Data        []Substance `json:"data"`
}

func categorizeInput(query string) string {
	lower := strings.ToLower(query)

	patterns := map[string]*regexp.Regexp{
		"drink":          regexp.MustCompile(`\b(milk|soda|juice|energy drink|wine|alcohol|beer|beverage|water)\b`),
		"processed food": regexp.MustCompile(`\b(junk food|market food|burger|pizza|sausage|noodles)\b`),
		"home food":      regexp.MustCompile(`\b(home food|homemade|cooked|recipe|stew|rice|chapati)\b`),
		"snacks":         regexp.MustCompile(`\b(biscuit|candy|sweet|gum|chips)\b`),
		"other":          regexp.MustCompile(`\b(reagent|vinegar|salt|pepper|paper)\b`),
	}

	for category, pattern := range patterns {
		if pattern.MatchString(lower) {
			return category
		}
	}
	return "unknown"
}

// Fetch from your own substances API
func fetchLocalSubstances(query string) ([]Substance, error) {
	url := "http://localhost:8080/substances/search?q=" + query
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var all []Substance
	if err := json.NewDecoder(resp.Body).Decode(&all); err != nil {
		return nil, err
	}

	// Filter by regex match against Name or Formula
	regex, err := regexp.Compile("(?i)" + regexp.QuoteMeta(query))
	if err != nil {
		return nil, err
	}

	var matched []Substance
	for _, s := range all {
		if regex.MatchString(s.Name) || regex.MatchString(s.Formula) {
			matched = append(matched, s)
		}
	}
	return matched, nil
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))

	app.Get("/search", func(c *fiber.Ctx) error {
		query := c.Query("q")
		if query == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Missing query"})
		}

		category := categorizeInput(query)

		data, err := fetchLocalSubstances(query)
		if err != nil {
			log.Println("API fetch error:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch data"})
		}

		result := SearchResult{
			Query:       query,
			Category:    category,
			Description: "Fetched data from local substances API",
			Data:        data,
		}
		return c.JSON(result)
	})

	app.Get("/substances", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Query("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		substance, err := fetchById(id)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": "Substance not found"})
		}
		return c.JSON(substance)
	})
	log.Println("Server running on http://localhost:3000")
	log.Fatal(app.Listen(":3000"))
}

func fetchById(id int) (*Substance, error) {
	url := "http://localhost:8080/substances/" + strconv.Itoa(id)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var substance Substance
	if err := json.NewDecoder(resp.Body).Decode(&substance); err != nil {
		return nil, err
	}
	return &substance, nil
}
