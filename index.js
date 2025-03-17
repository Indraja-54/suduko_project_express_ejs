const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { solution, board } = require("./functions.js")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});

app.get("/suduko", (req, res) => {
    res.render("index.ejs", {});
});

app.get("/suduko/generate", (req, res) => {
    res.render("new.ejs", { board });
});

app.get("/sudoku/solve", (req, res) => {
    res.render("solve.ejs", { solution }); 
});

app.post("/sudoku/submit", (req, res) => {
    const submittedBoard = req.body; 
    const validationMatrix = [];

    for (let row = 0; row < 9; row++) {
        validationMatrix[row] = [];
        for (let col = 0; col < 9; col++) {
            if (parseInt(submittedBoard[`cell_${row}_${col}`]) === solution[row][col]) {
                validationMatrix[row][col] = true; 
            } else {
                validationMatrix[row][col] = false; 
            }
        }
    }
    res.render("result.ejs", { submittedBoard, validationMatrix });
   
})
