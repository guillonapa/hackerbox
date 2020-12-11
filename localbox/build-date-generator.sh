BUILD_DATE=$(date)
cat << EOF > ./src/utils/BuildDate.js
export function buildDate() {
    return '$BUILD_DATE';
}
EOF

