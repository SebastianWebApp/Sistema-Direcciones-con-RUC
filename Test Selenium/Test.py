from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def abrir_navegador():
    driver = webdriver.Chrome()
    driver.get("http://localhost:80/")
    return driver

def esperar_notificacion(driver):
    WebDriverWait(driver, 60).until(
        lambda d: d.execute_script(
            "return window.getComputedStyle(document.getElementById('Div_Notificacion')).display"
        ) != 'none'
    )
    time.sleep(15)  # Espera adicional para asegurar que la notificación se muestre correctamente

def espera_carga_completa(driver):
    WebDriverWait(driver, 60).until(
        lambda d: d.execute_script(
            "return window.getComputedStyle(document.getElementById('Informacion')).display"
        ) != 'none'
    )    
    time.sleep(10)  # Espera adicional para asegurar que todo esté cargado

def validar_ruc(driver, ruc):
    print(f"Validando RUC: {ruc}")
    ruc_input = driver.find_element(By.ID, "Inp_RUC")
    ruc_input.clear()
    ruc_input.send_keys(ruc)

    btn_validar = driver.find_element(By.ID, "Btn_Validar")
    btn_validar.click()

    esperar_notificacion(driver)

    time.sleep(2)

def validar_Ruc_correcto(driver, ruc):
    print(f"Validando RUC: {ruc}")
    ruc_input = driver.find_element(By.ID, "Inp_RUC")
    ruc_input.clear()
    ruc_input.send_keys(ruc)

    btn_validar = driver.find_element(By.ID, "Btn_Validar")
    btn_validar.click()

    espera_carga_completa(driver)    
    time.sleep(2)

def test_ruc_invalido(driver):
    validar_ruc(driver, "1234567890001")
    print("✅ Test RUC inválido completado\n")

def test_ruc_existente(driver):
    validar_ruc(driver, "0992879955001")  # Simula uno existente según tu backend
    print("✅ Test RUC existente completado\n")

def test_ruc_digitos_incorrectos(driver):
    validar_ruc(driver, "1234567890")  # RUC con menos de 13 dígitos
    print("✅ Test RUC con dígitos incorrectos completado\n")

def test_ruc_valido(driver):
    validar_Ruc_correcto(driver, "0992879955002")  # RUC válido para pruebas
    print("✅ Test RUC válido completado\n")

def test_campos_incompletos_crear_cliente(driver):
    
    Btn_Crear = driver.find_element(By.ID, "Btn_Crear")
    Btn_Crear.click()

    esperar_notificacion(driver)
    
    notificacion = driver.find_element(By.ID, "Notificacion").text
    print("✅ Test Campos Incompletos")
    time.sleep(2)

def test_campos_completos_crear_cliente(driver):

    tbody = driver.find_element(By.ID, "addressTableBody")
    filas = tbody.find_elements(By.TAG_NAME, "tr")
    
    if not filas:
        print("❌ No hay filas en la tabla de direcciones.")
        return
    
    for i, fila in enumerate(filas, start=1):
        celdas = fila.find_elements(By.TAG_NAME, "td")

        # Llenar campos básicos
        celdas[0].find_element(By.TAG_NAME, "input").send_keys(f"Comercial {i}")
        celdas[1].find_element(By.TAG_NAME, "input").send_keys(f"Tipo {i}")
        celdas[2].find_element(By.TAG_NAME, "input").send_keys(f"Representante {i}")
        celdas[3].find_element(By.TAG_NAME, "input").send_keys("0999999999")

        # Dirección
        direccion_inputs = celdas[4].find_elements(By.TAG_NAME, "input")
        for input in direccion_inputs:
            placeholder = input.get_attribute("placeholder")           
            if placeholder == "Número de casa:":
                input.send_keys("742")

    Btn_Crear = driver.find_element(By.ID, "Btn_Crear")
    Btn_Crear.click()

    esperar_notificacion(driver)
    
    print("✅ Test Crear Cliente con Campos Completos")
    time.sleep(2)

def test_filtros(driver):
    time.sleep(5)  # Espera para asegurar que la página esté completamente cargada
    FiltroClientes = driver.find_element(By.ID, "FiltroClientes")
    FiltroClientes.clear()
    FiltroClientes.send_keys("0992879955002")  # RUC válido para pruebas    
    print("✅ Test Probando filtro")
    time.sleep(10)

def test_cliente_creado(driver):
    try:
        # Esperar a que esté disponible el bloque con data-ruc específico
        bloque = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-ruc="0992879955002"]'))
        )

        # Scroll hacia el bloque
        driver.execute_script("arguments[0].scrollIntoView(true);", bloque)

        # Clic con JavaScript
        driver.execute_script("arguments[0].click();", bloque)

        print("✅ Clic realizado exitosamente sobre el cliente con data-ruc='0992879955002'")

        # Esperar a que el div #Informacion se muestre
        WebDriverWait(driver, 10).until(
            lambda d: d.find_element(By.ID, "Informacion").value_of_css_property("display") != "none"
        )

        print("✅ Panel de información mostrado correctamente.")

        time.sleep(15)  # Espera para ver el resultado antes de cerrar el navegador        

    except Exception as e:
        print(f"❌ Error: {e}")

def test_agregar_fila(driver):
    try:
        # Contar las filas actuales
        filas_antes = len(driver.find_elements(By.CSS_SELECTOR, "#addressTableBody tr"))

        # Hacer clic en el botón para agregar una nueva fila
        boton_agregar = driver.find_element(By.CLASS_NAME, "add-row")
        boton_agregar.click()
        print("✅ Botón 'Agregar fila' clickeado")

        # Esperar que aparezca una fila nueva
        WebDriverWait(driver, 10).until(
            lambda d: len(d.find_elements(By.CSS_SELECTOR, "#addressTableBody tr")) > filas_antes
        )

        print("✅ Fila agregada exitosamente.")
        time.sleep(10)
    except Exception as e:
        print(f"❌ Error al agregar fila: {e}")

def test_eliminar_ultima_fila(driver):
    try:
        filas = driver.find_elements(By.CSS_SELECTOR, "#addressTableBody tr")
        if not filas:
            print("⚠️ No hay filas para eliminar.")
            return

        ultima_fila = filas[-1]

        boton_eliminar = ultima_fila.find_element(By.CLASS_NAME, "delete-row")
        boton_eliminar.click()
        print("✅ Botón 'Eliminar' clickeado")

        # Esperar que la fila sea eliminada
        WebDriverWait(driver, 10).until(
            lambda d: len(d.find_elements(By.CSS_SELECTOR, "#addressTableBody tr")) < len(filas)
        )

        print("✅ Última fila eliminada exitosamente.")
    except Exception as e:
        print(f"❌ Error al eliminar fila: {e}")

def test_nuevo_cliente(driver):
    try:
        # Hacer clic en el botón para crear un nuevo cliente
        Btn_Crear = driver.find_element(By.ID, "Btn_Nuevo_Cliente")
        Btn_Crear.click()
        print("✅ Botón 'Nuevo Cliente' clickeado")

        time.sleep(10)  # Espera para que el formulario se muestre

    except Exception as e:
        print(f"❌ Error al nuevo cliente: {e}")

def test_actualizar_cliente(driver):
    try:
        # Hacer clic en el botón para actualizar un cliente
        Btn_Actualizar = driver.find_element(By.ID, "Btn_Actualizar")
        Btn_Actualizar.click()

        print("✅ Botón 'Actualizar Cliente' clickeado")
        esperar_notificacion(driver)
        time.sleep(10)
      
    except Exception as e:
        print(f"❌ Error al actualizar cliente: {e}")

def test_eliminar_cliente(driver):
    try:
        # Hacer clic en el botón para eliminar un cliente
        Btn_Eliminar = driver.find_element(By.ID, "Btn_Eliminar")
        Btn_Eliminar.click()

        print("✅ Botón 'Eliminar Cliente' clickeado")
        esperar_notificacion(driver)
        time.sleep(10)

    except Exception as e:
        print(f"❌ Error al eliminar cliente: {e}")

# --- Ejecución de pruebas ---
if __name__ == "__main__":
    driver = abrir_navegador()
    
    test_ruc_invalido(driver)
    test_ruc_existente(driver)
    test_ruc_digitos_incorrectos(driver)
    test_ruc_valido(driver)
    test_campos_incompletos_crear_cliente(driver)
    test_campos_completos_crear_cliente(driver)
    test_filtros(driver)
    test_cliente_creado(driver)
    test_agregar_fila(driver)
    test_eliminar_ultima_fila(driver)
    test_actualizar_cliente(driver)
    test_cliente_creado(driver)
    test_nuevo_cliente(driver)
    test_cliente_creado(driver)
    test_eliminar_cliente(driver)

    driver.quit()