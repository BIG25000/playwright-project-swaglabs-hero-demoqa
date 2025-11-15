# Playwright Project - Swag Labs / Hero / DemoQA

This repository is a mini Playwright project for my QA Automation portfolio.  
It contains UI test scripts for **Swag Labs**, **The Internet (Hero)** and **DemoQA**.

---

## 🧪 Test Suites

### 1. Swag Labs (`saucedemo.com`)

Folder: `tests/login_Swag_Labs`, `tests/product_list_Swag_Labs`, `tests/cart_Swag_Labs`

Scenarios (examples):

- Login with valid user
- Login with invalid user (error message)
- Sort products by price (low to high / high to low)
- Open Product Detail Page (PDP)
- Add item to cart and verify cart

### 2. The Internet / Hero (`the-internet.herokuapp.com`)

Folder:  
`tests/checkBox_Hero`, `tests/fileUpload_Hero`,  
`tests/jsAlerts_Hero`, `tests/loading_Hero`

Scenarios (examples):

- Checkbox: select / unselect and verify result
- File upload: upload a file and verify file name
- JavaScript alerts: accept / dismiss alerts and verify text
- Dynamic loading: wait for element and verify it appears

### 3. DemoQA (`demoqa.com`)

Folder: `tests/textBox_DemoQA`, `tests/webTable_DemoQA`

Scenarios (examples):

- Text Box: fill form and verify output
- Web Tables: add / edit / delete rows and assert data

---

## 🛠 Tech Stack

- Playwright
- JavaScript (Node.js)
- VS Code

This project also uses:

- `global-setup.js` + `storageState.json` to keep login state (avoid login every test).

---
