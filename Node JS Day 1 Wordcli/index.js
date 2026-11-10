import { program } from "commander";
import fs from "fs";

program

  .name("wordcli")
  .description("CLI Application to count words,letters,lines in a file")
  .version("1.0.0");

// Program for Letters //                                               

program

  .command("letters")
  .description("Command to count the number of letters from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("The number of letters in the file is:", data.length);
  });

// Program for Words //

program
  .command("words")
  .description("Command to count the number of words from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("The number of words in the file is:", data.split(" ").length);
  });

// Program for Lines //

program
  .command("lines")
  .description("Command to count lines from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("The number of lines in this file:", data.split("\n").length);
  });

// Program for all //

program
  .command("all")
  .description("Command to count words, letters and lines from a file")
  .argument("<filePath>", "File Path")
  .action((filePath) => {
    const data = fs.readFileSync(filePath, "utf8");

    console.log("The number of letters in this file are:", data.length);

    console.log(
      "The number of words in this file are:",
      data.split(" ").length,
    );

    console.log(
      "The number of lines in this file are:",
      data.split("\n").length,
    );
  });

program.parse();
