Folder Structure

* src/
    * app/
        * core/                         # Singleton services & core utilities
            * guards/
            * interceptors/
            * services/
            * models/                   # Interfaces & enums shared across the app
        * shared/                       # Reusable components, pipes, directives
            * components/
            * directives/
            * pipes/
            * services/
        * features/                     # Each business feature in its own module
            * products/
                * components/           # Dumb (presentational) components
                * pages/                # Smart (container) components
                * services/
                * models/               # Feature-specific interfaces
                * store/                # NgRx or local state (optional)
            * users/
        * layouts/                      # App layouts (e.g., dashboard, auth)
            * main-layout/
                * header/   
                * sidebar/
    * app-routing.module.ts        # Main routes with lazy loading
    * app.component.ts
    * app.module.ts
