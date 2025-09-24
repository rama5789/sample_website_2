.PHONY: help install dev build clean lint format type-check test prepare all
.DEFAULT_GOAL := help

# Colors for help output
BOLD := \033[1m
RESET := \033[0m
BLUE := \033[34m

help: ## Show this help message
	@echo "$(BOLD)BintyByte Technologies Website$(RESET)"
	@echo ""
	@echo "$(BOLD)Available commands:$(RESET)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(BLUE)%-12s$(RESET) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

clean: ## Clean build artifacts
	npm run clean

lint: ## Run ESLint
	npm run lint

lint-fix: ## Fix ESLint issues automatically
	npm run lint:fix

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting
	npm run format:check

type-check: ## Run TypeScript type checking
	npm run type-check

prepare: ## Setup git hooks
	npm run prepare

quality: format lint type-check ## Run all quality checks (format, lint, type-check)

all: install quality build ## Install, run quality checks, and build

preview: build ## Build and preview production build
	npm run preview