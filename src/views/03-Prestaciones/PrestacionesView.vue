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

	<div class="prestaciones-page">
		<!-- HERO COMPACTO -->
		<section class="hero hero-compact">
			<div class="hero-bg"></div>
			<div class="hero-content">
				<div class="hero-tag">MODULO EPHDEM</div>
				<h1 class="hero-title">Estudio de Preinversion Hospitalaria</h1>
				<p class="hero-sub">Herramienta para la estimacion de equipamiento medico necesario para satisfacer una demanda proyectada de prestaciones.</p>
			</div>
		</section>

		<main class="prestaciones-content">
			<header class="prestaciones-header">
				<h2 class="section-title">Prestaciones</h2>
				<p class="section-subtitle">Selecciona las prestaciones que se asociaran al proyecto.</p>
			</header>

			<section class="filtros-panel">
				<div class="filtro">
					<label>Area</label>
					<select v-model="filtros.area">
						<option value="">Todas</option>
						<option v-for="area in opcionesArea" :key="area" :value="area">{{ area }}</option>
					</select>
				</div>
				<div class="filtro">
					<label>Subarea</label>
					<select v-model="filtros.subarea">
						<option value="">Todas</option>
						<option v-for="subarea in opcionesSubarea" :key="subarea" :value="subarea">{{ subarea }}</option>
					</select>
				</div>
				<div class="filtro">
					<label>Recinto</label>
					<select v-model="filtros.recinto">
						<option value="">Todos</option>
						<option v-for="recinto in opcionesRecinto" :key="recinto" :value="recinto">{{ recinto }}</option>
					</select>
				</div>
			</section>

			<section class="prestaciones-grid">
				<div class="prestaciones-panel">
					<div class="panel-title">Disponibles</div>
					<div v-if="prestacionesFiltradas.length === 0" class="lista-vacia">No hay prestaciones disponibles.</div>
					<div v-else class="prestaciones-lista">
						<div v-for="prestacion in prestacionesFiltradas" :key="prestacion.id" class="prestacion-item">
							<div class="prestacion-info">
								<div class="prestacion-codigo">{{ prestacion.codigo_fonasa }}</div>
								<div class="prestacion-nombre">{{ prestacion.nombre_prestacion }}</div>
							</div>
							<button class="accion accion-agregar" @click="agregarPrestacion(prestacion)">+</button>
						</div>
					</div>
				</div>

				<div class="prestaciones-panel">
					<div class="panel-title">Seleccionadas</div>
					<div v-if="prestacionesSeleccionadas.length === 0" class="lista-vacia">Aun no has seleccionado prestaciones.</div>
					<div v-else class="prestaciones-lista">
						<div v-for="prestacion in prestacionesSeleccionadas" :key="prestacion.id" class="prestacion-item">
							<div class="prestacion-info">
								<div class="prestacion-codigo">{{ prestacion.codigo_fonasa }}</div>
								<div class="prestacion-nombre">{{ prestacion.nombre_prestacion }}</div>
							</div>
							<button class="accion accion-quitar" @click="quitarPrestacion(prestacion)">x</button>
						</div>
					</div>
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
import { computed, ref } from 'vue'

const filtros = ref({
	area: '',
	subarea: '',
	recinto: '',
})

const prestaciones = ref([
	{
		id: 1,
		codigo_fonasa: '010101',
		nombre_prestacion: 'Consulta general adulto',
		area: 'Medicina',
		subarea: 'Consulta',
		recinto: 'Hospital',
	},
	{
		id: 2,
		codigo_fonasa: '010102',
		nombre_prestacion: 'Consulta general pediatrica',
		area: 'Medicina',
		subarea: 'Consulta',
		recinto: 'Hospital',
	},
	{
		id: 3,
		codigo_fonasa: '020201',
		nombre_prestacion: 'Radiografia de torax',
		area: 'Imagenologia',
		subarea: 'Rayos X',
		recinto: 'Centro',
	},
	{
		id: 4,
		codigo_fonasa: '030301',
		nombre_prestacion: 'Ecografia abdominal',
		area: 'Imagenologia',
		subarea: 'Ecografia',
		recinto: 'Centro',
	},
	{
		id: 5,
		codigo_fonasa: '040401',
		nombre_prestacion: 'Cirugia ambulatoria menor',
		area: 'Cirugia',
		subarea: 'Ambulatoria',
		recinto: 'Hospital',
	},
	{
		id: 6,
		codigo_fonasa: '050501',
		nombre_prestacion: 'Terapia kinesiologica',
		area: 'Rehabilitacion',
		subarea: 'Kinesiologia',
		recinto: 'Centro',
	},
])

const seleccionadas = ref([])

const opcionesArea = computed(() => {
	return [...new Set(prestaciones.value.map((p) => p.area))]
})

const opcionesSubarea = computed(() => {
	const base = filtros.value.area
		? prestaciones.value.filter((p) => p.area === filtros.value.area)
		: prestaciones.value
	return [...new Set(base.map((p) => p.subarea))]
})

const opcionesRecinto = computed(() => {
	const base = prestaciones.value.filter((p) => {
		if (filtros.value.area && p.area !== filtros.value.area) return false
		if (filtros.value.subarea && p.subarea !== filtros.value.subarea) return false
		return true
	})
	return [...new Set(base.map((p) => p.recinto))]
})

const prestacionesFiltradas = computed(() => {
	const seleccionadasIds = new Set(seleccionadas.value.map((p) => p.id))
	return prestaciones.value.filter((p) => {
		if (seleccionadasIds.has(p.id)) return false
		if (filtros.value.area && p.area !== filtros.value.area) return false
		if (filtros.value.subarea && p.subarea !== filtros.value.subarea) return false
		if (filtros.value.recinto && p.recinto !== filtros.value.recinto) return false
		return true
	})
})

const prestacionesSeleccionadas = computed(() => {
	return seleccionadas.value
})

function agregarPrestacion(prestacion) {
	if (seleccionadas.value.find((p) => p.id === prestacion.id)) return
	seleccionadas.value.push(prestacion)
}

function quitarPrestacion(prestacion) {
	seleccionadas.value = seleccionadas.value.filter((p) => p.id !== prestacion.id)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

// --- SIGEM-UV TOPBAR 1 ---
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

// --- SIGEM-UV TOPBAR 2 ---
.sigem-topbar2 {
	position: sticky;
	top: 0;
	width: 100%;
	background: $color-blanco;
	box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	z-index: 1000;
}

// --- HERO ---
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

// --- CONTENIDO ---
.prestaciones-page {
	background: $color-fondo;
}
.prestaciones-content {
	max-width: 1200px;
	margin: 32px auto 72px auto;
	padding: 0 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.prestaciones-header {
	text-align: left;
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

.filtros-panel {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
	background: $color-blanco;
	border-radius: 16px;
	padding: 18px 20px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
}
.filtro {
	display: flex;
	flex-direction: column;
	gap: 6px;
	font-weight: 600;
	color: $color-primario;
}
.filtro select {
	padding: 10px 12px;
	border-radius: 10px;
	border: 1px solid $color-borde;
	font-weight: 500;
	color: $color-texto-principal;
}

.prestaciones-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 22px;
}
.prestaciones-panel {
	background: $color-blanco;
	border-radius: 18px;
	padding: 20px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
	min-height: 360px;
}
.panel-title {
	font-size: 1.1rem;
	font-weight: 700;
	color: $color-primario;
	margin-bottom: 14px;
}
.prestaciones-lista {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.prestacion-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 12px 14px;
	border-radius: 12px;
	background: $color-claro;
	border: 1px solid $color-borde;
}
.prestacion-info {
	display: flex;
	flex-direction: column;
	gap: 4px;
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
.accion {
	width: 34px;
	height: 34px;
	border-radius: 8px;
	border: none;
	color: $color-blanco;
	font-weight: 700;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.accion-agregar {
	background: $color-exito;
}
.accion-quitar {
	background: $color-peligro;
}
.lista-vacia {
	background: $color-claro;
	padding: 24px;
	border-radius: 12px;
	text-align: center;
	color: $color-texto-secundario;
	border: 1px dashed $color-borde;
}

// --- SIGEM-UV BOTTOM BAR ---
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
	.filtros-panel {
		grid-template-columns: 1fr;
	}
	.prestaciones-grid {
		grid-template-columns: 1fr;
	}
}
</style>
