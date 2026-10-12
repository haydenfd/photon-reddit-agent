> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Get apiprojects whatsapptemplates



## OpenAPI

````yaml /api-reference/dashboard-openapi.json get /api/projects/{id}/whatsapp/templates
openapi: 3.1.0
info:
  title: Photon Dashboard API
  description: >-
    Internal REST API for the Photon Dashboard. Authentication endpoints under
    `/api/auth/*` are handled by Better Auth and are not listed here.
  version: 0.1.0
  contact:
    name: Photon
    url: https://photon.codes
servers: []
security: []
tags:
  - name: Projects
    description: Project CRUD and Spectrum integration
  - name: Billing
    description: Subscription and billing endpoints
  - name: Payments
    description: Payment provider provisioning
  - name: Profile
    description: User profile
  - name: Onboarding
    description: Onboarding flow state
  - name: OTP
    description: Phone verification codes
  - name: Account
    description: Self-service account credentials
  - name: Privacy
    description: Data subject requests (deletion, etc.)
  - name: PostHog
    description: Analytics identity snapshots
  - name: System
    description: Health and diagnostics
paths:
  /api/projects/{id}/whatsapp/templates:
    get:
      tags:
        - Projects
      operationId: getApiProjectsByIdWhatsappTemplates
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
        - name: after
          in: query
          required: false
          schema:
            type: string
        - name: before
          in: query
          required: false
          schema:
            type: string
        - name: category
          in: query
          required: false
          schema:
            type: string
            enum:
              - MARKETING
              - UTILITY
              - AUTHENTICATION
        - name: language
          in: query
          required: false
          schema:
            type: string
        - name: limit
          in: query
          required: false
          schema:
            maximum: 100
            minimum: 1
            anyOf:
              - format: numeric
                default: 0
                type: string
              - maximum: 100
                minimum: 1
                type: number
        - name: name
          in: query
          required: false
          schema:
            type: string
        - name: nameOrContent
          in: query
          required: false
          schema:
            type: string
        - name: status
          in: query
          required: false
          schema:
            type: string
            enum:
              - APPROVED
              - PENDING
              - REJECTED
              - PAUSED
              - IN_APPEAL
              - PENDING_DELETION
              - DELETED
              - DISABLED
              - LIMIT_EXCEEDED
      responses:
        default:
          description: This operation does not declare a response schema.

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.