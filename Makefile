# All Command Helper!!!
help:
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:|^#' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS=":"; blue="\033[34m"; reset="\033[0m"} \
		/^#/ {desc = substr($$0, 3)} \
		/^[a-zA-Z_-]+:/ {printf "  %s%-10s%s : %s\n", blue, $$1, reset, desc}'

# Run Next.js in dev mode
run: 
	pnpm dev

# Clean and reinstall dependencies
start: 
	rm -rf .next node_modules pnpm-lock.yaml && pnpm install
