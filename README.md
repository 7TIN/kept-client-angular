# Kept - Angular Frontend

This is the Angular frontend for the Kept interview experience sharing platform. It is built with Angular and TypeScript.

**Backend Repository**: [https://github.com/7TIN/kept](https://www.google.com/search?q=https://github.com/7TIN/kept)

-----

## How to Run

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * **Node.js**
  * **Angular CLI**

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/your_username/kept-client-angular.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd kept-client-angular
    ```
3.  **Install dependencies**
    ```sh
    npm install
    ```
4.  **Run the application**
    ```sh
    ng serve
    ```

-----

## Environment Setup

You will need to set up the environment files in the `src/environments` directory.

### `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  API_BASE_URL: 'http://localhost:8080/api',
  AUTH_BASE_URL: 'http://localhost:8080/auth'
};
```

### `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  API_BASE_URL: '{backendlive}/api',
  AUTH_BASE_URL: '{backendlive}/auth'
};
```