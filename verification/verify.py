
from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for server to start
        print("Navigating to http://localhost:9002")
        try:
            page.goto("http://localhost:9002", timeout=30000)
        except Exception as e:
            print(f"Error connecting: {e}")
            return

        # Verify Age Verification Modal appears
        print("Checking Age Verification Modal...")
        try:
            page.wait_for_selector("text=Verificación de Edad", timeout=15000)
            page.screenshot(path="verification/1_age_verification.png")
        except Exception as e:
            print(f"Modal not found: {e}")
            page.screenshot(path="verification/error_modal.png")
            return

        # Click "Sí, soy mayor de 18"
        print("Clicking verify...")
        page.get_by_role("button", name="Sí, soy mayor de 18").click()

        # Wait for main content
        print("Waiting for main content...")
        try:
            page.wait_for_selector("text=La Taberna de JJ", timeout=10000)

            # Check Location Selector
            print("Checking Location Selector...")
            page.wait_for_selector("text=Selecciona tu Área de Interés", timeout=10000)
            page.screenshot(path="verification/2_home_page.png")

            # Check Beverage Search
            print("Checking Beverage Search...")
            # Ensure the tab is clickable
            page.click("text=Buscar Bebidas")
            page.wait_for_selector("text=Búsqueda Inteligente de Bebidas", timeout=10000)
            page.screenshot(path="verification/3_search.png")

        except Exception as e:
            print(f"Error in main flow: {e}")
            page.screenshot(path="verification/error_flow.png")

        browser.close()

if __name__ == "__main__":
    run()
