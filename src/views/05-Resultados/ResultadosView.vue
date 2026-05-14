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

	<div class="resultados-page">
		<section class="hero hero-compact">
			<div class="hero-bg"></div>
			<div class="hero-content">
				<div class="hero-tag">MODULO EPHDEM</div>
				<h1 class="hero-title">Estudio de Preinversion Hospitalaria</h1>
				<p class="hero-sub">Resumen de equipamiento calculado desde el back-end para el proyecto seleccionado.</p>
			</div>
		</section>

		<main class="resultados-content">
			<header class="resultados-header">
				<div class="header-left">
					<button class="btn-back" type="button" @click="volverAtras"><i class="fa-solid fa-arrow-left"></i> Volver</button>
					<h2 class="section-title">Resultados</h2>
					<p class="section-subtitle">Resumen general y desglose por origen del equipamiento.</p>
				</div>
				<div class="header-actions">
					<button class="btn-export btn-export-excel" type="button" @click="exportarExcel"><i class="fa-solid fa-file-excel"></i> Excel</button>
					<button class="btn-export btn-export-pdf" type="button" @click="exportarPdf"><i class="fa-solid fa-file-pdf"></i> PDF</button>
				</div>
			</header>

			<section class="resumen-banner">
				<div class="banner-left">
					<h3>Proyecto</h3>
					<p class="banner-sub">{{ nombreProyecto }}</p>
				</div>
				<div class="banner-total">
					<span class="metric-value">{{ totalEquipos }}</span>
					<span class="metric-label">Equipos totales</span>
				</div>
			</section>

			<section class="filtros-panel">
				<div class="filtro filtro-buscar">
					<label>Buscar equipo</label>
					<input v-model="filtros.texto" type="text" placeholder="Nombre de equipo" />
				</div>
				<div class="filtro">
					<label>Tipo de equipo</label>
					<select v-model="filtros.tipo">
						<option value="">Todos</option>
						<option v-for="tipo in opcionesTipo" :key="tipo" :value="tipo">{{ tipo }}</option>
					</select>
				</div>
				<div class="filtro">
					<label>Origen del calculo</label>
					<select v-model="filtros.origen">
						<option value="">Todos</option>
						<option value="recinto">Equipos asociados a recintos</option>
						<option value="especifico">Equipos especificos de prestacion</option>
					</select>
				</div>
				<div class="filtro">
					<label>Recinto</label>
					<select v-model="filtros.recinto">
						<option value="">Todos</option>
						<option v-for="recinto in opcionesRecinto" :key="recinto" :value="recinto">{{ recinto }}</option>
					</select>
				</div>
				<div class="filtro">
					<label>Prestacion</label>
					<select v-model="filtros.prestacion">
						<option value="">Todas</option>
						<option v-for="prestacion in opcionesPrestacion" :key="prestacion" :value="prestacion">{{ prestacion }}</option>
					</select>
				</div>
			</section>

			<section class="resumen-panel">
				<div class="panel-title">Resumen de equipos necesarios</div>
				<div class="resumen-list">
					<div class="resumen-row resumen-row-head">
						<div>Equipo</div>
						<div class="row-total">Total</div>
					</div>
					<div v-for="equipo in resumenEquipos" :key="equipo.id" class="resumen-row">
						<div class="row-main">
							<div class="equipo-nombre">{{ equipo.nombre }}</div>
						</div>
						<div class="row-total">{{ equipo.total }}</div>
					</div>
				</div>
			</section>

			<section class="desglose-panel">
				<div class="panel-title">Desglose caracterizado</div>
				<div class="desglose-section">
					<div class="desglose-title">Equipos asociados a recintos</div>
					<div v-if="recintosAgrupados.length === 0" class="lista-vacia">Sin equipos para este filtro.</div>
					<div v-else class="recintos-grid">
						<div v-for="recinto in recintosAgrupados" :key="recinto.nombre" class="recinto-table" :class="recinto.colorClass">
							<div class="recinto-title">{{ recinto.nombre }}</div>
							<div class="tabla-mini">
								<div class="tabla-mini-head">
									<span>Equipo</span>
									<span class="tabla-mini-cantidad">Cantidad</span>
								</div>
								<div v-for="item in recinto.items" :key="item.nombre" class="tabla-mini-row">
									<span>{{ item.nombre }}</span>
									<span class="tabla-mini-cantidad">{{ item.cantidad }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="desglose-section desglose-section-especifico">
					<div class="desglose-title">Equipos especificos</div>
					<div v-if="equiposEspecificosTabla.length === 0" class="lista-vacia">Sin equipos para este filtro.</div>
					<div v-else class="recinto-table especifico-table">
						<div class="recinto-title">Equipos especificos por prestacion</div>
						<div class="tabla-mini">
							<div class="tabla-mini-head">
								<span>Equipo</span>
								<span class="tabla-mini-cantidad">Cantidad</span>
							</div>
							<div v-for="item in equiposEspecificosTabla" :key="item.nombre" class="tabla-mini-row">
								<span>{{ item.nombre }}</span>
								<span class="tabla-mini-cantidad">{{ item.cantidad }}</span>
							</div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const nombreProyecto = ref('Proyecto seleccionado')

const filtros = ref({
	texto: '',
	tipo: '',
	origen: '',
	recinto: '',
	prestacion: '',
})

const resultados = ref([
	{
		id: 1,
		nombre: 'Monitor multiparametros',
		tipo: 'Monitoreo',
		total: 2,
		recinto: 1,
		especifico: 1,
		recintos: ['Pabellon', 'Sala de procedimientos'],
		prestaciones: ['UPC - Ventilacion mecanica'],
	},
	{
		id: 2,
		nombre: 'Ventilador mecanico',
		tipo: 'Soporte vital',
		total: 3,
		recinto: 2,
		especifico: 1,
		recintos: ['UCI', 'UPC'],
		prestaciones: ['UPC - Ventilacion mecanica'],
	},
	{
		id: 3,
		nombre: 'Bomba de infusion',
		tipo: 'Soporte vital',
		total: 4,
		recinto: 2,
		especifico: 2,
		recintos: ['UCI'],
		prestaciones: ['UPC - Terapia intensiva', 'UPC - Nutricion parenteral'],
	},
	{
		id: 4,
		nombre: 'Ecografo portatil',
		tipo: 'Imagenologia',
		total: 1,
		recinto: 1,
		especifico: 0,
		recintos: ['Urgencia'],
		prestaciones: [],
	},
	{
		id: 5,
		nombre: 'Desfibrilador',
		tipo: 'Emergencia',
		total: 2,
		recinto: 1,
		especifico: 1,
		recintos: ['Urgencia'],
		prestaciones: ['UPC - Reanimacion avanzada'],
	},
])

const opcionesTipo = computed(() => {
	return [...new Set(resultados.value.map((equipo) => equipo.tipo))]
})

const opcionesRecinto = computed(() => {
	return [...new Set(resultados.value.flatMap((equipo) => equipo.recintos))]
})

const opcionesPrestacion = computed(() => {
	return [...new Set(resultados.value.flatMap((equipo) => equipo.prestaciones))]
})

const resultadosFiltrados = computed(() => {
	const texto = filtros.value.texto.trim().toLowerCase()
	return resultados.value.filter((equipo) => {
		if (texto && !equipo.nombre.toLowerCase().includes(texto)) return false
		if (filtros.value.tipo && equipo.tipo !== filtros.value.tipo) return false
		if (filtros.value.recinto && !equipo.recintos.includes(filtros.value.recinto)) return false
		if (filtros.value.prestacion && !equipo.prestaciones.includes(filtros.value.prestacion)) return false
		if (filtros.value.origen === 'recinto' && equipo.recinto === 0) return false
		if (filtros.value.origen === 'especifico' && equipo.especifico === 0) return false
		return true
	})
})

const resumenEquipos = computed(() => {
	return resultadosFiltrados.value.map((equipo) => {
		const total = equipo.total || 1
		const porcentajeRecinto = Math.round((equipo.recinto / total) * 100)
		const porcentajeEspecifico = Math.round((equipo.especifico / total) * 100)
		return {
			...equipo,
			porcentajeRecinto,
			porcentajeEspecifico,
		}
	})
})

const equiposRecinto = computed(() => {
	return resultadosFiltrados.value.filter((equipo) => equipo.recinto > 0)
})

const equiposEspecificos = computed(() => {
	return resultadosFiltrados.value.filter((equipo) => equipo.especifico > 0)
})

const recintosAgrupados = computed(() => {
	const mapa = new Map()
	const colores = ['pastel-amber', 'pastel-rose', 'pastel-peach', 'pastel-sand']
	let colorIndex = 0

	equiposRecinto.value.forEach((equipo) => {
		const recintos = Array.isArray(equipo.recintos) && equipo.recintos.length > 0
			? equipo.recintos
			: ['Recinto']
		const cantidadPorRecinto = Math.max(1, Math.round(equipo.recinto / recintos.length))

		recintos.forEach((recinto) => {
			if (!mapa.has(recinto)) {
				mapa.set(recinto, {
					nombre: recinto,
					items: [],
					colorClass: colores[colorIndex % colores.length],
				})
				colorIndex += 1
			}
			mapa.get(recinto).items.push({
				nombre: equipo.nombre,
				cantidad: cantidadPorRecinto,
			})
		})
	})

	return Array.from(mapa.values())
})

const equiposEspecificosTabla = computed(() => {
	return equiposEspecificos.value.map((equipo) => ({
		nombre: equipo.nombre,
		cantidad: equipo.especifico,
	}))
})

const totalEquipos = computed(() => {
	return resultadosFiltrados.value.reduce((acc, equipo) => acc + equipo.total, 0)
})

function volverAtras() {
	router.back()
	setTimeout(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
	}, 0)
}

function exportarExcel() {
	alert('Exportar a Excel (pendiente de integrar con el back-end).')
}

function exportarPdf() {
	alert('Exportar a PDF (pendiente de integrar con el back-end).')
}
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
	max-width: 740px;
	line-height: 1.5;
	margin: 0;
}

.resultados-page {
	background: $color-fondo;
}
.resultados-content {
	max-width: 1480px;
	margin: 32px auto 72px auto;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.resultados-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 16px;
}
.header-left {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.header-actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
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
	margin-bottom: 6px;
	transition: background 0.2s ease, border 0.2s ease;

	&:hover {
		background: lighten($color-primario, 6%);
		border-color: lighten($color-primario, 6%);
	}
}
.btn-export {
	background: $color-blanco;
	border: 1px solid $color-borde;
	color: $color-primario;
	border-radius: 12px;
	padding: 10px 14px;
	font-weight: 700;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	gap: 8px;
	box-shadow: 0 6px 16px rgba(0, 60, 88, 0.08);
}
.btn-export-excel {
	color: #1e8e5a;
	border-color: rgba(30, 142, 90, 0.35);
}
.btn-export-pdf {
	background: $color-blanco;
	border-color: $color-borde;
	color: #d5431c;
}
.section-title {
	font-size: 1.6rem;
	font-weight: 700;
	color: $color-primario;
	margin: 0 0 4px 0;
}
.section-subtitle {
	margin: 0;
	color: $color-texto-secundario;
}

.resumen-banner {
	background: $color-primario;
	border-radius: 18px;
	padding: 22px 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
	border: 1px solid rgba(255, 255, 255, 0.12);
	box-shadow: 0 10px 22px rgba(0, 60, 88, 0.25);
}
.banner-left h3 {
	margin: 0;
	font-size: 1.3rem;
	font-weight: 700;
	color: $color-blanco;
}
.banner-sub {
	margin: 4px 0 0 0;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.75);
}
.banner-total {
	display: flex;
	align-items: baseline;
	gap: 10px;
	color: $color-blanco;
}
.metric-value {
	font-size: 1.6rem;
	font-weight: 700;
}
.metric-label {
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.7);
}

.filtros-panel {
	background: $color-blanco;
	border-radius: 16px;
	padding: 18px 20px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 14px;
}
.filtro label {
	font-size: 0.85rem;
	color: $color-primario;
	font-weight: 600;
	margin-bottom: 6px;
	display: block;
}
.filtro input,
.filtro select {
	width: 100%;
	padding: 8px 10px;
	border: 1px solid $color-borde;
	border-radius: 10px;
	font-weight: 500;
	color: $color-texto-principal;
}

.resumen-panel,
.desglose-panel {
	background: $color-blanco;
	border-radius: 16px;
	padding: 20px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
}
.panel-title {
	font-weight: 700;
	color: $color-primario;
	margin-bottom: 16px;
}
.resumen-list {
	display: flex;
	flex-direction: column;
	gap: 0;
	border: 1px solid $color-borde;
	border-radius: 12px;
	overflow: hidden;
}
.resumen-row {
	background: $color-blanco;
	padding: 12px 16px;
	display: grid;
	grid-template-columns: 1fr 70px;
	gap: 16px;
	align-items: center;
	border-bottom: 1px solid $color-borde;
}
.resumen-row:last-child {
	border-bottom: none;
}
.resumen-row-head {
	background: #eef5f9;
	font-weight: 700;
	color: $color-primario;
}
.row-main {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.row-total {
	font-size: 1.4rem;
	font-weight: 700;
	color: $color-primario;
	text-align: right;
}
.equipo-nombre {
	font-weight: 700;
	color: $color-primario;
}
.desglose-title {
	font-weight: 700;
	color: $color-primario;
	margin-bottom: 12px;
}
.desglose-section {
	margin-bottom: 20px;
}
.desglose-section-especifico {
	margin-top: 8px;
}
.recintos-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 18px;
}
.recinto-table {
	border-radius: 12px;
	padding: 0;
	border: 1px solid $color-borde;
	box-shadow: none;
	overflow: hidden;
	background: $color-blanco;
}
.recinto-title {
	font-weight: 700;
	color: $color-primario;
	background: #eef5f9;
	margin: 0;
	padding: 10px 14px;
	border-radius: 0;
}
.tabla-mini {
	display: flex;
	flex-direction: column;
	gap: 0;
}
.tabla-mini-head {
	display: grid;
	grid-template-columns: 1fr 80px;
	font-size: 0.8rem;
	font-weight: 700;
	color: $color-primario;
	background: #eef5f9;
	border-radius: 0;
	padding: 8px 12px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}
.tabla-mini-row {
	display: grid;
	grid-template-columns: 1fr 80px;
	align-items: center;
	padding: 8px 12px;
	border-bottom: 1px solid $color-borde;
	font-weight: 600;
	color: $color-texto-principal;
}
.tabla-mini-row:last-child {
	border-bottom: none;
}
.tabla-mini-cantidad {
	text-align: right;
}
.pastel-amber {
	background: $color-blanco;
}
.pastel-rose {
	background: $color-blanco;
}
.pastel-peach {
	background: $color-blanco;
}
.pastel-sand {
	background: $color-blanco;
}
.especifico-table {
	background: $color-blanco;
	max-width: 50%;
}
.lista-vacia {
	color: $color-texto-secundario;
	font-weight: 500;
	padding: 12px 0;
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
	.resultados-header {
		flex-direction: column;
		align-items: flex-start;
	}
	.resumen-banner {
		flex-direction: column;
		align-items: flex-start;
	}
	.resumen-row {
		grid-template-columns: 1fr;
		text-align: left;
	}
	.row-total {
		text-align: left;
	}
	.recintos-grid {
		grid-template-columns: 1fr;
	}
	.especifico-table {
		max-width: 100%;
	}
}
</style>
