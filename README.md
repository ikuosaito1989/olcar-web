# olcar

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Architecture

```mermaid
flowchart TB
    subgraph GCP["☁️ GCP"]
        subgraph App["🚀 Cloud Run"]
            FE["🖥️ Frontend Container<br/>Nuxt 3 / Vue 3 / TypeScript<br/>(Docker on Cloud Run)"]
            BE["🧩 Backend Container<br/>.NET 6 / C#<br/>(Docker on Cloud Run)"]
        end
        GCS["🗂️ Cloud Storage"]
        Scheduler["⏰ Cloud Scheduler"]
        CloudBuild["🏗️ Cloud Build"]
        Docker["🐳 Docker (Image Build)"]
    end

    User["👤 User"] --> FE
    FE --> BE

    subgraph Infra["🛠️ Infrastructure / Middleware"]
        subgraph ConoHa["🖥️ ConoHa VPS"]
            DB["🗄️ MySQL"]
            ES["🔎 Elasticsearch"]
        end
        PW["🤖 Playwright<br/>(SNS automation)"]
        OpenAI["💬 ChatGPT API"]
        GHA["🔁 GitHub Actions"]
    end

    Docker -.build/deploy.-> FE
    Docker -.build/deploy.-> BE
    GHA --> CloudBuild
    CloudBuild --> Docker

    BE --> DB
    BE --> ES
    DB <--> |Always sync| ES
    BE --> GCS
    BE --> OpenAI
    Scheduler --> BE
    PW --> BE
```
