#!/bin/bash

echo "🔍 KiroTax Console - Project Structure Verification"
echo "=================================================="
echo ""

echo "✅ Checking project structure..."
echo ""

# Check main directories
directories=("app" "components" "lib" "types" "utils")
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✓ $dir/ exists"
    else
        echo "✗ $dir/ missing"
    fi
done

echo ""
echo "✅ Checking key files..."
echo ""

# Check key files
files=(
    "app/layout.tsx"
    "app/page.tsx"
    "app/login/page.tsx"
    "app/dashboard/owner/page.tsx"
    "app/dashboard/practice-head/page.tsx"
    "app/dashboard/senior-ca/page.tsx"
    "app/dashboard/article/page.tsx"
    "app/dashboard/audit/page.tsx"
    "app/dashboard/investor/page.tsx"
    "components/Sidebar.tsx"
    "components/Navbar.tsx"
    "components/DashboardLayout.tsx"
    "components/RoleGuard.tsx"
    "components/UploadCard.tsx"
    "components/OCRFieldsPanel.tsx"
    "components/StatusBadge.tsx"
    "lib/auth-context.tsx"
    "lib/permissions.ts"
    "types/index.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file missing"
    fi
done

echo ""
echo "✅ Checking dependencies..."
echo ""

if [ -f "package.json" ]; then
    echo "✓ package.json exists"
    if grep -q "@heroicons/react" package.json; then
        echo "✓ @heroicons/react installed"
    fi
    if grep -q "next" package.json; then
        echo "✓ Next.js installed"
    fi
    if grep -q "typescript" package.json; then
        echo "✓ TypeScript installed"
    fi
    if grep -q "tailwindcss" package.json; then
        echo "✓ TailwindCSS installed"
    fi
fi

echo ""
echo "=================================================="
echo "✅ Project structure verification complete!"
echo ""
echo "⚠️  Note: Node.js 20.9.0+ required to run the dev server"
echo "   Current version: $(node --version)"
echo ""
echo "To run the application:"
echo "  1. Upgrade Node.js to v20.9.0 or higher"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
