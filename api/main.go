package main

import (
	"encoding/json"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
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

var substances []Substance

func main() {
	// Load data from JSON file
	file, err := os.ReadFile("substances.json")
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(file, &substances); err != nil {
		panic(err)
	}

	r := gin.Default()

	// Allow CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Route: Get all substances
	r.GET("/substances", func(c *gin.Context) {
		c.JSON(http.StatusOK, substances)
	})

	// Route: Search by regex
	r.GET("/substances/search", func(c *gin.Context) {
		query := c.Param("q")
		query = strings.TrimSpace(query)

		// Make a case-insensitive regex pattern
		pattern := "(?i)" + regexp.QuoteMeta(query)
		re, err := regexp.Compile(pattern)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid search pattern"})
			return
		}

		var results []Substance
		for _, s := range substances {
			if re.MatchString(s.Name) || re.MatchString(s.Formula) {
				results = append(results, s)
			}
		}

		if len(results) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"message": "No matching substances"})
			return
		}

		c.JSON(http.StatusOK, results)
	})

	// Route: Get substance by ID
	r.GET("/substances/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}

		for _, s := range substances {
			if s.ID == id {
				c.JSON(http.StatusOK, s)
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"error": "Substance not found"})
	})

	r.Run(":8080")
}
