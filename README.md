# **KPI Dashboard**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## **Getting Started**

### Clone the repository
git clone https://github.com/LewieM1995/kpi_app.git

# Navigate into the project folder
cd kpi_app

# Install dependencies
npm install

# Set up environment variables (create a .env.local file)
NEXT_PUBLIC_API_URL={GET /api/specific_kpi_endpoint} // route to controllers for specific kpis
NEXT_PUBLIC_API_URL_AUTH={POST /api/login} // authenticate the user
NEXT_PUBLIC_API_URL_QFORM={POST /api/quarantine-ink} // form submission for quarantine_form
NEXT_PUBLIC_API_URL_CHARTS={GET /api/charts} // retrieves chart data for visualization
NEXT_PUBLIC_API_URL_PANTONES={GET /api/pantones} // fetche Pantone color information
NEXT_PUBLIC_API_URL_ADDPANTONE={POST /api/add-pantone} // add a new Pantone color to the system
NEXT_PUBLIC_API_URL_CMFORM={POST /api/form_} // form submission for cm_submission
NEXT_PUBLIC_API_URL_UPDATEPANTONES={PUT /api/update-pantone} // updates an existing Pantone color record
NEXT_PUBLIC_API_URL_DELETEPANTONE={DELETE /api/delete-pantone} // deletes a Pantone color record

# Run the development server
npm run dev


## File Structure

/kpi_app
│── /public          # Static assets (images, etc.)
│── .env.local       # environment variables
│── README.md        # This README file
│── /src/app
│   ├── page.js // main page (empty atm) localhost:3000/
│   ├── layout.js // display children provide auth
│   ├── /add_pantones
│   ├── /admin
│   ├── /auth_context
│   ├── /client_layout
|   ├── /cm_submission
|   ├── /kp_graphs
|   ├── /login
|   ├── /quarantine_form
        ├── pages.js
        ├── components.js


# **Contact / About Me**

GitHub: [@LewieM1995](https://github.com/LewieM1995)
LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/lewie-marks-b84504124/)