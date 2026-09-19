// ==========================================
// TRACE FORENSIC - FRONTEND API CONNECTION
// ==========================================


// ==========================================
// 1. CREATE NEW CASE
// ==========================================

async function createCase(caseData) {
    try {
        const response = await fetch("/api/cases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(caseData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create case");
        }

        console.log("✅ Case created:", data);

        return data;

    } catch (error) {
        console.error("❌ Error creating case:", error);
    }
}


// ==========================================
// 2. GET ALL CASES
// ==========================================

async function loadCases() {
    try {
        const response = await fetch("/api/cases");

        const cases = await response.json();

        if (!response.ok) {
            throw new Error(cases.message || "Failed to load cases");
        }

        console.log("✅ Cases received from backend:", cases);

        return cases;

    } catch (error) {
        console.error("❌ Error loading cases:", error);
    }
}


// ==========================================
// 3. CREATE NEW EVIDENCE
// ==========================================

async function createEvidence(evidenceData) {
    try {
        const response = await fetch("/api/evidence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evidenceData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create evidence");
        }

        console.log("✅ Evidence created:", data);

        return data;

    } catch (error) {
        console.error("❌ Error creating evidence:", error);
    }
}


// ==========================================
// 4. GET EVIDENCE FOR A CASE
// ==========================================

async function loadEvidence(caseId) {
    try {
        const response = await fetch(`/api/evidence/${caseId}`);

        const evidence = await response.json();

        if (!response.ok) {
            throw new Error(
                evidence.message || "Failed to load evidence"
            );
        }

        console.log("✅ Evidence received from backend:", evidence);

        return evidence;

    } catch (error) {
        console.error("❌ Error loading evidence:", error);
    }
}


// ==========================================
// 5. TEST BACKEND CONNECTION
// ==========================================

async function testBackend() {
    try {
        const response = await fetch("/api/status");

        const data = await response.json();

        console.log("================================");
        console.log("TRACE FORENSIC BACKEND STATUS");
        console.log("================================");
        console.log("Status:", data.status);
        console.log("Message:", data.message);
        console.log("Database:", data.database);
        console.log("================================");

        return data;

    } catch (error) {
        console.error("❌ Backend connection failed:", error);
    }
}