# Purpose
The codebase is for an academic-style personal website with consistent theme color.

# Page
## About
- Name, profile picture and a paragraph of introduction
## Blog
- A page containing a list of blogs as cards
- Each blog is consumed from files in a folder (blog/) in markdown format
## Publications
- A list of publication cards consumed from a .bib reference file
## Other Experience
- A list of experience cards with a picture on the left, title, period, and short description

# Development Requirement
- Ensure to use components that are re-usable
- Use React functional component
- Use TypeScript
- For css-related styles, make sure to use the theme instead of making customized fontsize, fontweight, or font family for each component. If the theme does not contain some specifications, feel free to update the theme.
- Avoid using background color, try to use lines to characterize elements
- Avoid using `Grid` from `@mui/material`

# Theme Color
## Light Mode
- text: #0a0f10;
- background: #f2f6f7;
- primary: #6c9aa3;
- secondary: #a7afc8;
- accent: #858ab2;
## Dark Mode
- text: #eff4f5;
- background: #080c0d;
- primary: #5c8a93;
- secondary: #373f58;
- accent: #4d527a;

