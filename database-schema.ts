// Egyptian Audit Tool - Database Schema
// Implements the hybrid PostgreSQL + MongoDB architecture

// PostgreSQL Schema Definitions (using Prisma-like syntax)
export const postgresqlSchema = `
-- Users and Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  first_name_ar VARCHAR(100),
  last_name_ar VARCHAR(100),
  role VARCHAR(50) NOT NULL DEFAULT 'auditor',
  department VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies and Clients
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  commercial_registration VARCHAR(50) UNIQUE,
  tax_number VARCHAR(50) UNIQUE,
  industry VARCHAR(100),
  address TEXT,
  address_ar TEXT,
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Engagements
CREATE TABLE audit_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  engagement_type VARCHAR(50) NOT NULL,
  fiscal_year INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'planning',
  lead_auditor_id UUID REFERENCES users(id),
  risk_assessment JSONB,
  materiality_amount DECIMAL(15,2),
  description_ar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Team Assignments
CREATE TABLE audit_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES audit_engagements(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50) NOT NULL,
  hours_budgeted INTEGER,
  hours_actual INTEGER DEFAULT 0,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk Assessments
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES audit_engagements(id),
  risk_area VARCHAR(100) NOT NULL,
  risk_area_ar VARCHAR(100),
  inherent_risk INTEGER CHECK (inherent_risk BETWEEN 1 AND 10),
  control_risk INTEGER CHECK (control_risk BETWEEN 1 AND 10),
  detection_risk INTEGER CHECK (detection_risk BETWEEN 1 AND 10),
  overall_risk INTEGER GENERATED ALWAYS AS (
    ROUND((inherent_risk * control_risk * detection_risk) / 100.0)
  ) STORED,
  risk_response TEXT,
  risk_response_ar TEXT,
  assessed_by UUID REFERENCES users(id),
  assessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Standards Tracking
CREATE TABLE compliance_standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  description TEXT,
  description_ar TEXT,
  effective_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Compliance Status
CREATE TABLE company_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  standard_id UUID REFERENCES compliance_standards(id),
  compliance_level INTEGER CHECK (compliance_level BETWEEN 0 AND 100),
  last_assessment DATE,
  next_assessment DATE,
  assessor_id UUID REFERENCES users(id),
  notes TEXT,
  notes_ar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, standard_id)
);

-- Audit Findings
CREATE TABLE audit_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES audit_engagements(id),
  finding_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  description TEXT NOT NULL,
  description_ar TEXT,
  recommendation TEXT,
  recommendation_ar TEXT,
  management_response TEXT,
  management_response_ar TEXT,
  status VARCHAR(50) DEFAULT 'open',
  identified_by UUID REFERENCES users(id),
  identified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id)
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES audit_engagements(id),
  report_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  description_ar TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  generated_by UUID REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  file_path VARCHAR(500),
  file_size INTEGER,
  format VARCHAR(10),
  language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Trail
CREATE TABLE audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_companies_tax_number ON companies(tax_number);
CREATE INDEX idx_companies_commercial_registration ON companies(commercial_registration);
CREATE INDEX idx_audit_engagements_company ON audit_engagements(company_id);
CREATE INDEX idx_audit_engagements_status ON audit_engagements(status);
CREATE INDEX idx_risk_assessments_engagement ON risk_assessments(engagement_id);
CREATE INDEX idx_compliance_company_standard ON company_compliance(company_id, standard_id);
CREATE INDEX idx_audit_findings_engagement ON audit_findings(engagement_id);
CREATE INDEX idx_audit_findings_severity ON audit_findings(severity);
CREATE INDEX idx_reports_engagement ON reports(engagement_id);
CREATE INDEX idx_audit_trail_user ON audit_trail(user_id);
CREATE INDEX idx_audit_trail_entity ON audit_trail(entity_type, entity_id);
CREATE INDEX idx_audit_trail_created ON audit_trail(created_at);
`

// MongoDB Schema Definitions (Document structures)
export interface DocumentMetadata {
  _id: string
  fileName: string
  fileNameAr?: string
  fileType: string
  fileSize: number
  uploadedBy: string
  uploadedAt: Date
  engagementId: string
  category: "workpaper" | "evidence" | "template" | "report"
  tags: string[]
  isConfidential: boolean
  accessLevel: "public" | "team" | "senior" | "partner"
  version: number
  parentDocumentId?: string
  checksum: string
  ocrText?: string
  aiAnalysis?: {
    riskScore: number
    anomalies: any[]
    confidence: number
    processedAt: Date
  }
}

export interface WorkpaperDocument {
  _id: string
  documentId: string
  content: {
    sections: WorkpaperSection[]
    metadata: {
      preparedBy: string
      reviewedBy?: string
      approvedBy?: string
      preparedDate: Date
      reviewDate?: Date
      approvalDate?: Date
    }
    references: {
      leadSchedule?: string
      supportingDocuments: string[]
      priorYearReference?: string
    }
  }
  aiInsights?: {
    suggestedTests: string[]
    riskAreas: string[]
    complianceChecks: string[]
    recommendations: string[]
  }
}

export interface WorkpaperSection {
  id: string
  title: string
  titleAr?: string
  type: "narrative" | "calculation" | "analysis" | "checklist" | "evidence"
  content: any
  completed: boolean
  reviewNotes?: string
  reviewNotesAr?: string
}

export interface AuditTemplate {
  _id: string
  name: string
  nameAr?: string
  type: "checklist" | "workpaper" | "report"
  industry?: string
  applicableStandards: string[]
  template: {
    sections: TemplateSection[]
    instructions: string
    instructionsAr?: string
    estimatedHours: number
  }
  version: string
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface TemplateSection {
  id: string
  title: string
  titleAr?: string
  type: string
  required: boolean
  instructions?: string
  instructionsAr?: string
  defaultContent?: any
  validationRules?: any[]
}

export interface ComplianceRule {
  _id: string
  standardCode: string
  ruleId: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  category: string
  severity: "critical" | "high" | "medium" | "low"
  automatedCheck: boolean
  checkLogic?: {
    conditions: any[]
    actions: any[]
  }
  applicableEntities: string[]
  effectiveDate: Date
  isActive: boolean
}

// Database Migration Scripts
export const migrationScripts = {
  "001_initial_schema": postgresqlSchema,

  "002_add_arabic_support": `
    -- Add Arabic language support columns where missing
    ALTER TABLE audit_engagements ADD COLUMN description_ar TEXT;
    ALTER TABLE reports ADD COLUMN description_ar TEXT;
    
    -- Update existing data with Arabic placeholders
    UPDATE compliance_standards SET name_ar = name WHERE name_ar IS NULL;
    UPDATE companies SET name_ar = name WHERE name_ar IS NULL;
  `,

  "003_performance_optimizations": `
    -- Add composite indexes for common queries
    CREATE INDEX idx_audit_engagements_company_year ON audit_engagements(company_id, fiscal_year);
    CREATE INDEX idx_risk_assessments_overall_risk ON risk_assessments(overall_risk DESC);
    CREATE INDEX idx_compliance_level_assessment ON company_compliance(compliance_level, last_assessment);
    
    -- Add partial indexes for active records
    CREATE INDEX idx_active_companies ON companies(id) WHERE is_active = true;
    CREATE INDEX idx_active_users ON users(id) WHERE is_active = true;
    CREATE INDEX idx_open_findings ON audit_findings(id) WHERE status = 'open';
  `,

  "004_audit_trail_partitioning": `
    -- Partition audit_trail table by month for better performance
    CREATE TABLE audit_trail_y2024m01 PARTITION OF audit_trail
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
    
    CREATE TABLE audit_trail_y2024m02 PARTITION OF audit_trail
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
    
    -- Add automatic partition creation function
    CREATE OR REPLACE FUNCTION create_monthly_partition(table_name text, start_date date)
    RETURNS void AS $$
    DECLARE
        partition_name text;
        end_date date;
    BEGIN
        partition_name := table_name || '_y' || EXTRACT(year FROM start_date) || 'm' || LPAD(EXTRACT(month FROM start_date)::text, 2, '0');
        end_date := start_date + interval '1 month';
        
        EXECUTE format('CREATE TABLE %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
                      partition_name, table_name, start_date, end_date);
    END;
    $$ LANGUAGE plpgsql;
  `,
}

// MongoDB Collection Initialization
export const mongoCollections = {
  documents: "documents",
  workpapers: "workpapers",
  templates: "templates",
  complianceRules: "compliance_rules",
  aiAnalysis: "ai_analysis",
  systemLogs: "system_logs",
}

// Database Connection and Setup Functions
export class DatabaseManager {
  static async initializePostgreSQL() {
    // Initialize PostgreSQL connection and run migrations
    console.log("Initializing PostgreSQL database...")
    // Implementation would use a proper database client like pg or Prisma
  }

  static async initializeMongoDB() {
    // Initialize MongoDB connection and create collections
    console.log("Initializing MongoDB database...")
    // Implementation would use MongoDB driver or Mongoose
  }

  static async runMigrations() {
    // Run database migrations in order
    console.log("Running database migrations...")
    // Implementation would track and execute migrations
  }

  static async seedInitialData() {
    // Seed database with initial Egyptian compliance standards and templates
    console.log("Seeding initial data...")
    // Implementation would insert Egyptian Auditing Standards, tax regulations, etc.
  }
}
