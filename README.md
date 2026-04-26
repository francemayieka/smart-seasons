# 🌿 SmartSeasons

**Where Farming Meets Magic.**  
SmartSeasons is a next-generation field monitoring and management platform tailored for African agriculture. Built to empower farmers and field agents with data-driven insights, the platform streamlines crop tracking, health monitoring, and administrative oversight through an organic, high-impact interface.

---

## ✨ Key Features

- **Organic Landing Page**: A premium aesthetic designed to inspire trust and modernity in agriculture.
- **Agent Field Monitoring**: Field agents can track crop stages (Planted, Growing, Ready, Harvested) and record vital observations (Soil Moisture, Crop Health).
- **Admin Dashboard**: Comprehensive oversight of all field operations, agent performance tracking, and "At Risk" field identification using smart filtering.
- **Responsive Design**: Fully optimized for mobile devices, allowing agents to capture data directly from the field.
- **Secure RBAC**: Role-Based Access Control ensuring agents and administrators have isolated, secure workspaces.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or Supabase)
- Prisma CLI

### Installation

1. **Clone the repository**:
   ```bash
   git clone <my-repo-url>
   cd smart-seasons
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your database and authentication secrets:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 🔐 Test Credentials

For evaluation purposes, use the following credentials:

### **Administrator Access**
- **Email**: `admin@smartseasons.com`
- **Password**: `seasons254`
- **Portal**: Access through the "Dashboard" button after login.

### **Field Agent Access**
- **Email**: `simbalui@smartseasons.com`
- **Password**: `lui254`
- **Portal**: Real-time field update workspace.

---

## 🌐 Deployment

The project is configured for seamless deployment on Vercel.

- **Live URL**: [smart-seasons.vercel](https://smart-seasons.vercel.app)


## 🛠️ Built With

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Typography**: Poppins & Roboto


---

*Proudly crafted by France*
