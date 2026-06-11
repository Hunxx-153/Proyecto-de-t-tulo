<template>
	<!-- TOP BAR 1: Logos institucionales -->
	<div class="sigem-topbar1">
		<div class="sigem-topbar1-center">
			<a href="https://uv.cl" target="_blank"><img src="https://sigem-uv.cl/_general/logos/uv_blanco.png" alt="UV" height="36" class="sigem-topbar1-logo" /></a>
			<a href="https://biomedica.uv.cl/" target="_blank"><img src="https://sigem-uv.cl/_general/logos/biomedica_logo.png" alt="Biomedica" height="36" class="sigem-topbar1-logo" /></a>
		</div>
		<a href="#" class="sigem-topbar1-acceder">Acceder</a>
	</div>

	<!-- TOP BAR 2: Bootstrap navbar -->
	<nav class="navbar navbar-expand-md navbar-light bg-light shadow sigem-topbar2" style="z-index:1020;">
		<div class="container-fluid">
			<a class="navbar-brand d-flex align-items-center" href="https://sigem-uv.cl/" target="_blank">
				<img src="https://sigem-uv.cl/_general/logos/LOGO%20SIGEM-UV%20HORIZONTAL.png" alt="SIGEM-UV" height="28" style="padding-left:10px;">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSIGEMUV" aria-controls="navbarSIGEMUV" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSIGEMUV">
				<ul class="navbar-nav ms-auto mb-2 mb-md-0">
					<li class="nav-item">
						<a class="nav-link d-flex align-items-center" href="#MODULOS"><i class="fa fa-th me-2"></i>Modulos</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#PROYECTOS">Proyectos</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="nosotros.php">Nosotros</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#footer">Contacto</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="./admin_sigem/sigem_login.php?m=CPANEL&link=../endesarrollo.php"><i class="fa fa-cog"></i></a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="parametros-page">
		<section class="hero hero-compact">
			<div class="hero-bg"></div>
			<div class="hero-content">
				<div class="hero-tag">MODULO EPHDEM</div>
				<h1 class="hero-title">Estudio de Preinversión Hospitalaria</h1>
				<p class="hero-sub">Configura los parámetros por prestación para calcular equipamiento médico.</p>
			</div>
		</section>

		<!-- Tooltip flotante global -->
		<div v-if="tooltipPosicion.visible" class="tooltip-flotante" :style="{ top: tooltipPosicion.top, left: tooltipPosicion.left }">
			<div class="tooltip-contenido">{{ tooltipPosicion.texto }}</div>
			<div class="tooltip-flecha"></div>
		</div>

		<main class="parametros-content">
			<header class="parametros-header">
				<button class="btn-back" type="button" @click="volverAtras"><i class="fa-solid fa-arrow-left"></i> Volver</button>
				<h2 class="section-title">Parámetros</h2>
				<p class="section-subtitle">Completa las variables por prestación seleccionada.</p>
			</header>

			<section v-if="filas.length === 0" class="panel-vacio">
				<p>No hay prestaciones seleccionadas para parametrizar.</p>
				<button class="btn-secundario" @click="router.push('/prestaciones')">Volver a prestaciones</button>
			</section>

			<section v-else class="tabla-panel">
				<div class="tabla-scroll">
					<table class="tabla-parametros">
						<thead>
							<tr>
								<th>Prestacion</th>
								<th>
									Demanda
									<span class="info-icon" :data-tooltip="infoTexts.demanda" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
								<th>
									Dias al año disponibles
									<span class="info-icon" :data-tooltip="infoTexts.diasAnuales" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
								<th>
									Tiempo de procedimiento (min)
									<span class="info-icon" :data-tooltip="infoTexts.tiempoProcedimiento" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
								<th>
									Tasa de rotación
									<span class="info-icon" :data-tooltip="infoTexts.tasaRotacion" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
								<th>
									Disponibilidad (%)
									<span class="info-icon" :data-tooltip="infoTexts.disponibilidad" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
								<th>
									Jornada laboral (hrs)
									<span class="info-icon" :data-tooltip="infoTexts.jornadaLaboral" @mouseenter="mostrarTooltip" @mouseleave="ocultarTooltip">i</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="fila in filas" :key="fila.id">
								<td>
									<div class="prestacion-codigo">{{ fila.codigo_fonasa }}</div>
									<div class="prestacion-nombre">{{ fila.nombre_prestacion }}</div>
								</td>
								<td>
									<input v-model.number="fila.demanda" type="number" min="0" step="1" />
								</td>
								<td>
									<input v-model.number="fila.diasAnuales" type="number" min="1" step="1" />
								</td>
								<td class="celda-tiempo-procedimiento">
									<input v-model.number="fila.tiempoProcedimiento" type="number" min="0" step="0.1" @input="actualizarDesdeTiempo(fila)" />
									<div class="campo-ayuda">Equivale a {{ formatearDiasEquivalentes(fila.tiempoProcedimiento) }}</div>
								</td>
								<td>
									<input v-model.number="fila.tasaRotacion" type="number" min="0" step="0.01" @input="actualizarDesdeTasa(fila)" />
								</td>
								<td>
									<input v-model.number="fila.disponibilidad" type="number" min="0" max="100" step="0.1" />
								</td>
								<td>
									<input v-model.number="fila.jornadaLaboral" type="number" min="0" step="0.1" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="acciones-finales">
					<button class="btn-principal" @click="guardarYCalcular">Guardar y calcular</button>
				</div>
			</section>
		</main>
	</div>

	<!-- BOTTOM BAR: Informacion de contacto -->
	<footer class="sigem-bottomline" id="footer">
		<div class="sigem-bottomline-content">
			<div class="sigem-bottomline-left">
				<img src="https://sigem-uv.cl/_general/logos/LOGO_SIGEM-UV_HORIZONTAL-BLANCO.png" alt="SIGEM-UV" height="48" />
			</div>
			<div class="sigem-bottomline-center">
				<div>Gral. Cruz 222, Valparaiso ::: +56 32 2603662</div>
				<div>
					<a href="mailto:contacto@sigem-uv.cl" style="color:#fff">contacto@sigem-uv.cl</a> :::
					<a href="https://biomedica.uv.cl" style="color:#fff" target="_blank">www.biomedica.uv.cl</a>
				</div>
				<div class="sigem-bottomline-social">
					<a title="LinkedIn" href="https://www.linkedin.com" target="_blank"><img src="https://sigem-uv.cl/_general/logos/icons8-linkedin-48.png" alt="LinkedIn" height="28"/></a>
					<a title="Twitter" href="https://www.twitter.com" target="_blank"><img src="https://sigem-uv.cl/_general/logos/icons8-twitterx-50.png" alt="Twitter" height="28"/></a>
					<a title="Instagram" href="https://www.instagram.com" target="_blank"><img src="https://sigem-uv.cl/_general/logos/icons8-instagram-48.png" alt="Instagram" height="28"/></a>
					<a title="Facebook" href="https://www.facebook.com" target="_blank"><img src="https://sigem-uv.cl/_general/logos/icons8-facebook-48.png" alt="Facebook" height="28"/></a>
				</div>
				<div class="sigem-bottomline-copy">&copy; 2026 <b>SIGEM-UV</b> | Todos los Derechos Reservados</div>
			</div>
			<div class="sigem-bottomline-right">
				<img src="https://sigem-uv.cl/_general/logos/uv_blanco.png" alt="UV" height="48" />
			</div>
		</div>
	</footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const PRESTACIONES_STORAGE_KEY = 'ephdem_prestaciones_seleccionadas'
const PARAMETROS_STORAGE_KEY = 'ephdem_parametros_prestaciones'
const MINUTOS_POR_HORA = 60
const HORAS_POR_DIA = 24
const MINUTOS_POR_DIA = MINUTOS_POR_HORA * HORAS_POR_DIA

const infoTexts = {
	demanda: 'Cantidad de atenciones proyectadas para esta prestación en el período.',
	diasAnuales: 'Número de días disponibles al año para operar. En atención cerrada normalmente 365, pero editable.',
	tiempoProcedimiento: 'Minutos por procedimiento. Se sincroniza automáticamente con la tasa de rotación.',
	tasaRotacion: 'Cantidad de procedimientos por día equivalente (24 hrs = 1.0). Se sincroniza con tiempo de procedimiento.',
	disponibilidad: 'Porcentaje de disponibilidad real del equipo para esta prestación.',
	jornadaLaboral: 'Horas efectivas de operación al día. En atención cerrada normalmente 24, pero editable.',
}

const filas = ref([])
const tooltipPosicion = ref({ top: '0px', left: '0px', visible: false, texto: '' })

function mostrarTooltip(event) {
	const span = event.target
	const rect = span.getBoundingClientRect()
	tooltipPosicion.value = {
		top: `${rect.bottom + 8}px`,
		left: `${rect.left}px`,
		visible: true,
		texto: span.getAttribute('data-tooltip'),
	}
}

function ocultarTooltip() {
	tooltipPosicion.value.visible = false
}

function crearFila(prestacion, parametrosGuardados) {
	const tiempoProcedimientoInicial =
		parametrosGuardados?.tiempoProcedimiento ??
		prestacion.tiempo_procedimiento ??
		prestacion.tiempoProcedimiento ??
		MINUTOS_POR_HORA
	const tasaRotacionInicial = redondear(numeroSeguro(tiempoProcedimientoInicial) / MINUTOS_POR_DIA)

	return {
		id: prestacion.id,
		codigo_fonasa: prestacion.codigo_fonasa,
		nombre_prestacion: prestacion.nombre_prestacion,
		demanda: parametrosGuardados?.demanda ?? 0,
		diasAnuales: parametrosGuardados?.diasAnuales ?? 365,
		tiempoProcedimiento: tiempoProcedimientoInicial,
		tasaRotacion: parametrosGuardados?.tasaRotacion ?? tasaRotacionInicial,
		disponibilidad: parametrosGuardados?.disponibilidad ?? 100,
		jornadaLaboral: parametrosGuardados?.jornadaLaboral ?? 24,
	}
}

function redondear(valor) {
	return Math.round(valor * 100) / 100
}

function numeroSeguro(valor) {
	return Number.isFinite(valor) ? valor : 0
}

function formatearDiasEquivalentes(minutos) {
	const dias = redondear(numeroSeguro(minutos) / MINUTOS_POR_DIA)
	return `${dias} día${dias === 1 ? '' : 's'}`
}

function actualizarDesdeTiempo(fila) {
	const tiempo = numeroSeguro(fila.tiempoProcedimiento)
	fila.tasaRotacion = redondear(tiempo / MINUTOS_POR_DIA)
}

function actualizarDesdeTasa(fila) {
	const tasa = numeroSeguro(fila.tasaRotacion)
	fila.tiempoProcedimiento = redondear(tasa * MINUTOS_POR_DIA)
}

function cargarDatos() {
	const rawPrestaciones = localStorage.getItem(PRESTACIONES_STORAGE_KEY)
	if (!rawPrestaciones) return

	const rawParametros = localStorage.getItem(PARAMETROS_STORAGE_KEY)

	try {
		const prestaciones = JSON.parse(rawPrestaciones)
		if (!Array.isArray(prestaciones)) return

		const parametrosGuardados = rawParametros ? JSON.parse(rawParametros) : []
		const parametrosMap = new Map(
			Array.isArray(parametrosGuardados) ? parametrosGuardados.map((item) => [item.id, item]) : [],
		)

		filas.value = prestaciones.map((prestacion) => crearFila(prestacion, parametrosMap.get(prestacion.id)))
	} catch (error) {
		localStorage.removeItem(PRESTACIONES_STORAGE_KEY)
		localStorage.removeItem(PARAMETROS_STORAGE_KEY)
		alert('No se pudieron cargar las prestaciones/parametros guardados.')
		console.error('Error al cargar datos guardados:', error)
	}
}

function guardarYCalcular() {
	localStorage.setItem(PARAMETROS_STORAGE_KEY, JSON.stringify(filas.value))
	router.push('/resultados')
}

function volverAtras() {
	router.back()
	setTimeout(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
	}, 0)
}

onMounted(() => {
	cargarDatos()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.sigem-topbar1 {
	width: 100%;
	background: #003c58;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 10px 0 10px 0;
	min-height: 56px;
	z-index: 1001;
}
.sigem-topbar1-center {
	display: flex;
	align-items: center;
	gap: 32px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.sigem-topbar1-logo {
	opacity: 0.8;
	transition: opacity 0.2s;
	&:hover { opacity: 1; }
}
.sigem-topbar1-acceder {
	color: #fff;
	font-weight: 500;
	text-decoration: none;
	font-size: 1.08rem;
	margin-right: 32px;
	cursor: pointer;
	position: absolute;
	right: 0;
	background: none !important;
	border: none !important;
	padding: 0 !important;
	border-radius: 0 !important;
	transition: none !important;
}

.sigem-topbar2 {
	position: sticky;
	top: 0;
	width: 100%;
	background: $color-blanco;
	box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	z-index: 1000;
}

.hero {
	background: $color-secundario;
	position: relative;
	padding: 38px 48px;
	overflow: hidden;
	text-align: center;
}
.hero-compact {
	padding: 28px 48px;
}
.hero-bg {
	position: absolute;
	inset: 0;
	background: url('@/assets/img/mac.jpg') center/cover no-repeat;
	opacity: 1;
	filter: none;
}
.hero-content {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
}
.hero-tag {
	font-size: 12px;
	color: rgba($color-blanco, 0.35);
	letter-spacing: 2.5px;
	text-transform: uppercase;
}
.hero-title {
	font-size: 26px;
	font-weight: 500;
	color: $color-blanco;
	line-height: 1.25;
	margin: 0;
}
.hero-sub {
	font-size: 14px;
	color: rgba($color-blanco, 0.6);
	max-width: 700px;
	line-height: 1.5;
	margin: 0;
}

.parametros-page {
	background: $color-fondo;
}
.parametros-content {
	max-width: 1480px;
	margin: 32px auto 72px auto;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.btn-back {
	align-self: flex-start;
	background: $color-primario;
	color: $color-blanco;
	border: 1px solid $color-primario;
	border-radius: 999px;
	padding: 6px 12px;
	font-weight: 600;
	cursor: pointer;
	margin-bottom: 10px;
	transition: background 0.2s ease, border 0.2s ease;

	&:hover {
		background: mix($color-blanco, $color-primario, 6%);
		border-color: mix($color-blanco, $color-primario, 6%);
	}
}
.section-title {
	font-size: 1.6rem;
	font-weight: 700;
	color: $color-primario;
	margin: 0 0 6px 0;
}
.section-subtitle {
	margin: 0;
	color: $color-texto-secundario;
}

.panel-vacio,
.tabla-panel {
	background: $color-blanco;
	border-radius: 16px;
	padding: 20px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
	overflow: visible;
}
.panel-vacio {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14px;
}

.tabla-scroll {
	overflow-x: auto;
	overflow-y: visible;
}
.tabla-parametros {
	width: 100%;
	min-width: 1200px;
	border-collapse: separate;
	border-spacing: 0;
}
.tabla-parametros th,
.tabla-parametros td {
	padding: 12px 10px;
	border-bottom: 1px solid $color-borde;
	text-align: left;
	vertical-align: middle;
}
.tabla-parametros th {
	background: #e9f1f6;
	color: $color-primario;
	font-size: 0.9rem;
	font-weight: 700;
	position: sticky;
	top: 0;
}
.tabla-parametros td input {
	width: 100%;
	padding: 8px 10px;
	border: 1px solid $color-borde;
	border-radius: 8px;
	background: $color-blanco;
	font-weight: 500;
	color: $color-texto-principal;
}
.celda-tiempo-procedimiento {
	padding-bottom: 18px;
}
.prestacion-codigo {
	font-size: 0.85rem;
	font-weight: 700;
	color: $color-primario;
}
.prestacion-nombre {
	font-size: 0.95rem;
	font-weight: 500;
	color: $color-texto-principal;
}
.campo-ayuda {
	display: block;
	margin-top: 6px;
	font-size: 0.8rem;
	color: $color-texto-secundario;
}
.info-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	margin-left: 6px;
	border-radius: 50%;
	background: rgba(0, 60, 88, 0.14);
	color: $color-primario;
	font-size: 0.72rem;
	font-weight: 700;
	cursor: help;
}

.tooltip-flotante {
	position: fixed;
	z-index: 10000;
	pointer-events: none;
}

.tooltip-contenido {
	width: 240px;
	padding: 10px 14px;
	background: $color-primario;
	color: $color-blanco;
	font-size: 0.85rem;
	font-weight: 500;
	border-radius: 8px;
	text-align: center;
	line-height: 1.5;
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	word-wrap: break-word;
}

.tooltip-flecha {
	position: absolute;
	top: -7px;
	left: 0;
	width: 0;
	height: 0;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-bottom: 7px solid $color-primario;
}

.acciones-finales {
	margin-top: 16px;
	display: flex;
	justify-content: flex-end;
}
.btn-principal,
.btn-secundario {
	border: none;
	border-radius: 10px;
	padding: 10px 18px;
	font-weight: 700;
	cursor: pointer;
}
.btn-principal {
	background: $color-primario;
	color: $color-blanco;
}
.btn-secundario {
	background: rgba(0, 60, 88, 0.12);
	color: $color-primario;
}

.sigem-bottomline {
	width: 100%;
	background: #003c58;
	color: #fff;
	padding: 0;
	margin-top: 48px;
}
.sigem-bottomline-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 1400px;
	margin: 0 auto;
	padding: 12px 24px;
	flex-wrap: wrap;
}
.sigem-bottomline-left,
.sigem-bottomline-right {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
}
.sigem-bottomline-center {
	flex: 1 1 400px;
	text-align: center;
	font-size: 1.05rem;
}
.sigem-bottomline-social {
	margin: 8px 0;
	display: flex;
	gap: 10px;
	justify-content: center;
}
.sigem-bottomline-copy {
	font-size: 0.95rem;
	opacity: 0.8;
	margin-top: 4px;
}

@media (max-width: 980px) {
	.panel-vacio {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
