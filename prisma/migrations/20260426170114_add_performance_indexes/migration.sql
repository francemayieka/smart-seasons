-- CreateIndex
CREATE INDEX "Field_status_idx" ON "Field"("status");

-- CreateIndex
CREATE INDEX "Field_agentId_idx" ON "Field"("agentId");

-- CreateIndex
CREATE INDEX "Field_createdAt_idx" ON "Field"("createdAt");

-- CreateIndex
CREATE INDEX "Observation_fieldId_idx" ON "Observation"("fieldId");

-- CreateIndex
CREATE INDEX "Observation_agentId_idx" ON "Observation"("agentId");

-- CreateIndex
CREATE INDEX "Observation_createdAt_idx" ON "Observation"("createdAt");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
