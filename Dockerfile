# Use the official Playwright image from Microsoft
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install missing browsers if any (Playwright image usually comes with them)
# RUN npx playwright install

# Set environment variables (can be overridden during run)
ENV ENV=dev

# Command to run tests and generate reports
# We use 'sh -c' to allow multiple commands
CMD ["sh", "-c", "npm test && npm run report:allure"]
