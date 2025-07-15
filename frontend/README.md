# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



### 23/06/25 
- Switched to Material UI and React Router DOM 7.6.2 
- Uninstalled the Chakara UI

### 27/0/2025 
- Please clean the credentials written in backend (googleAuthController) .....
- Also the auth Controller

### Tailwind CSS 
- .h-screen => heigth = 100vh
- z-[value] => z-index : 10
- top-[x px] : top : x px

### React Router ===
- Protected Page
    -   ``` 
        const navigate = useNavigate();
        if (!userId) {
            navigate('/auth/login');
            return;
        }
        ```
    - This manually calls navigate, which is fine, but it's being called during render, which is not allowed and causes React warnings or misbehavior.
    - Instead use 
    -   ```
                if (!userId) {
                    return <Navigate to="/auth/login" replace />;
                }
        ```
    - ###### Replace is used to perform Replace operation
        - It replaces the current entry in the browser’s history stack instead of adding a new one.
        -   ```
                    return <Navigate to="/auth/login" replace />;
                    navigate('/relative path from domain',{replace:true});
            ```