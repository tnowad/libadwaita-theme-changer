import { execSync } from "child_process";
import readline from "readline";
import chalk from "chalk";
import { homedir } from "os";
import path from "path";

const homeDir = homedir();
const configDir = ".config";
const themesDir = ".themes";

function executeCommand(command: string): void {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Command execution failed: ${error}`);
    process.exit(1);
  }
}

function resetTheme(): void {
  const homeDir = process.env.HOME;
  const configDir = "/.config";
  console.log(chalk.bold("\n***\nResetting theme to default!\n***\n"));
  executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/gtk.css`);
  executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/gtk-dark.css`);
  executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/assets`);
  executeCommand(`rm ${homeDir}${configDir}/assets`);
}

function selectTheme(allThemes: string[]): void {
  console.log(chalk.bold("Select theme:"));
  allThemes.forEach((theme, index) => {
    console.log(`${index + 1}. ${theme}`);
  });
  console.log(chalk.bold("m. Manage themes"));
  console.log(chalk.bold("e. Exit"));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.bold("Your choice: "), (choice) => {
    rl.close();
    if (choice === "e") {
      console.log("Bye bye!");
      process.exit(0);
    } else if (choice === "m") {
      manageThemes();
    } else {
      const themeIndex = parseInt(choice, 10) - 1;
      if (themeIndex >= 0 && themeIndex < allThemes.length) {
        const selectedTheme = allThemes[themeIndex];
        console.log(chalk.bold(`\n***\nChosen ${selectedTheme}\n***\n`));
        console.log(chalk.bold("Removing previous theme..."));
        executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/gtk.css`);
        executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/gtk-dark.css`);
        executeCommand(`rm ${homeDir}${configDir}/gtk-4.0/assets`);
        executeCommand(`rm ${homeDir}${configDir}/assets`);
        console.log(chalk.bold("Installing new theme..."));
        executeCommand(
          `ln -s ${homeDir}${themesDir}/${selectedTheme}/gtk-4.0/gtk.css ${homeDir}${configDir}/gtk-4.0/gtk.css`
        );
        executeCommand(
          `ln -s ${homeDir}${themesDir}/${selectedTheme}/gtk-4.0/gtk-dark.css ${homeDir}${configDir}/gtk-4.0/gtk-dark.css`
        );
        executeCommand(
          `ln -s ${homeDir}${themesDir}/${selectedTheme}/gtk-4.0/assets ${homeDir}${configDir}/gtk-4.0/assets`
        );
        executeCommand(
          `ln -s ${homeDir}${themesDir}/${selectedTheme}/assets ${homeDir}${configDir}/assets`
        );
        console.log(chalk.bold("Done."));
      } else {
        console.log(chalk.bold("Incorrect value! Please try again!"));
      }
    }
  });
}

function manageThemes(): void {
  console.log(chalk.bold("\n***\nManage Themes\n***\n"));
  const homeDir = process.env.HOME;
  const themesDir = "/.themes";

  const themes = execSync(`ls ${homeDir}${themesDir}`)
    .toString()
    .split("\n")
    .filter(Boolean);
  if (themes.length === 0) {
    console.log(chalk.yellow("No themes found."));
    return;
  }

  console.log(chalk.bold("Available themes:"));
  themes.forEach((theme, index) => {
    console.log(`${index + 1}. ${theme}`);
  });

  console.log(chalk.bold("a. Add new theme"));
  console.log(chalk.bold("d. Delete theme"));
  console.log(chalk.bold("b. Back to theme selection"));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.bold("Your choice: "), (choice) => {
    rl.close();
    if (choice === "a") {
      addTheme();
    } else if (choice === "d") {
      deleteTheme(themes);
    } else if (choice === "b") {
      selectTheme(themes);
    } else {
      console.log(chalk.bold("Incorrect value! Please try again!"));
    }
  });
}

function addTheme(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.bold("Enter the path of the new theme: "), (themePath) => {
    rl.close();
    const homeDir = process.env.HOME;
    const themesDir = "/.themes";

    try {
      const themeName = themePath.substring(themePath.lastIndexOf("/") + 1);
      executeCommand(`mkdir -p ${homeDir}${themesDir}/${themeName}`);
      executeCommand(
        `cp -R ${themePath}/* ${homeDir}${themesDir}/${themeName}`
      );
      console.log(chalk.bold("Theme added successfully."));
      manageThemes();
    } catch (error) {
      console.error(`Failed to add theme: ${error}`);
      manageThemes();
    }
  });
}

function deleteTheme(themes: string[]): void {
  console.log(chalk.bold("\n***\nDelete Theme\n***\n"));
  const homeDir = process.env.HOME;
  const themesDir = "/.themes";

  console.log(chalk.bold("Available themes:"));
  themes.forEach((theme, index) => {
    console.log(`${index + 1}. ${theme}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    chalk.bold("Enter the number of the theme to delete: "),
    (choice) => {
      rl.close();
      const themeIndex = parseInt(choice, 10) - 1;
      if (themeIndex >= 0 && themeIndex < themes.length) {
        const themeToDelete = themes[themeIndex];
        executeCommand(`rm -rf ${homeDir}${themesDir}/${themeToDelete}`);
        console.log(chalk.bold("Theme deleted successfully."));
        manageThemes();
      } else {
        console.log(chalk.bold("Incorrect value! Please try again!"));
        deleteTheme(themes);
      }
    }
  );
}

if (require.main === module) {
  try {
    const homeDir = process.env.HOME;
    const configDir = "/.config";
    const themesDir = "/.themes";

    if (process.argv.includes("--reset")) {
      resetTheme();
    } else {
      const allThemes = execSync(`ls ${homeDir}${themesDir}`)
        .toString()
        .split("\n")
        .filter(Boolean);
      selectTheme(allThemes);
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    process.exit(1);
  }
}
