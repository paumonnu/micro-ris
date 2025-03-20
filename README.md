# Micro RIS

A simplified version of a Radiology Information System (RIS) with basic user management features, permission based roles, connection to Orthanc DICOM Server, diagnosis of radiologic studies pdf builder of reports.

Full list of features:

## Backend

- ✅ NestJS API
- ✅ Crud API endpoints for user management (Users, Roles, Permissions)
- ✅ JWT Authentication, user registration with email verification, user password recovery
- ✅ Protected permission based endpoints
- ❌ Studies
- ❌ Study reports
- ❌ Pdf study reports builder
- ❌ Connection and synchronization to Orthanc DICOM Server
- ❌ Statistics info endpoint

## Frontend

- ✅ React/React Query/Tailwind/Shadcn frontend
- ✅ Login/Logout through frontend
- ✅ Generic paginated/sorteable/filterable lists of resources
- ✅ User lists and basic edit form
- ❌ Roles
- ❌ Permissions
- ❌ Studies
- ❌ Study reports
- ❌ User profile
- ❌ Dashboard
