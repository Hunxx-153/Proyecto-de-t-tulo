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

	<div class="creacion-proyecto-page">
		<section class="hero hero-compact">
			<div class="hero-bg"></div>
			<div class="hero-content">
				<div class="hero-tag">MODULO EPHDEM</div>
				<h1 class="hero-title">Estudio de Preinversión Hospitalaria</h1>
				<p class="hero-sub">Crea un nuevo proyecto de estudio de preinversión hospitalaria.</p>
			</div>
		</section>

		<main class="creacion-content">
			<header class="creacion-header">
				<button class="btn-back" type="button" @click="volverAtras"><i class="fa-solid fa-arrow-left"></i> Volver</button>
				<h2 class="section-title">Crear Proyecto</h2>
				<p class="section-subtitle">Completa los datos del nuevo proyecto.</p>
			</header>

			<section class="formulario-panel">
				<form @submit.prevent="guardarProyecto" class="formulario">
					<div class="form-group">
						<label for="nombre-proyecto" class="form-label">Nombre del proyecto</label>
						<input 
							id="nombre-proyecto"
							v-model="formulario.nombreProyecto" 
							type="text" 
							class="form-input" 
							placeholder="Ingresa el nombre del proyecto"
							required
						/>
					</div>

					<div class="acciones-formulario">
						<button type="submit" class="btn-principal">Guardar</button>
						<button type="button" class="btn-secundario" @click="cancelar">Cancelar</button>
					</div>
				</form>
			</section>
		</main>
	</div>

	<!-- BOTTOM BAR: Información de contacto -->
	<footer class="sigem-bottomline" id="footer">
		<div class="sigem-bottomline-content">
			<div class="sigem-bottomline-left">
				<img src="https://sigem-uv.cl/_general/logos/LOGO_SIGEM-UV_HORIZONTAL-BLANCO.png" alt="SIGEM-UV" height="48" />
			</div>
			<div class="sigem-bottomline-center">
				<div>Gral. Cruz 222, Valparaíso ::: +56 32 2603662</div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formulario = ref({
	nombreProyecto: '',
})

function guardarProyecto() {
	const { nombreProyecto } = formulario.value

	if (!nombreProyecto.trim()) {
		alert('Por favor, ingresa un nombre para el proyecto.')
		return
	}

	// Guardar proyecto en localStorage
	const nuevoProyecto = {
		id: Date.now(),
		nombre_proyecto: nombreProyecto,
		fecha_creacion: new Date().toLocaleDateString('es-CL'),
		tipo_proyecto: 'Atencion cerrada',
	}

	// Obtener proyectos existentes
	const proyectosGuardados = localStorage.getItem('ephdem_proyectos')
	const proyectos = proyectosGuardados ? JSON.parse(proyectosGuardados) : []

	// Agregar nuevo proyecto
	proyectos.push(nuevoProyecto)
	localStorage.setItem('ephdem_proyectos', JSON.stringify(proyectos))

	// Redirigir a prestaciones
	router.push('/prestaciones')
}

function cancelar() {
	volverAtras()
}

function volverAtras() {
	router.back()
	setTimeout(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
	}, 0)
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
	max-width: 700px;
	line-height: 1.5;
	margin: 0;
}

.creacion-proyecto-page {
	background: $color-fondo;
}
.creacion-content {
	max-width: 800px;
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

.formulario-panel {
	background: $color-blanco;
	border-radius: 16px;
	padding: 32px;
	border: 1px solid $color-borde;
	box-shadow: 0 10px 22px $color-sombra-suave;
}

.formulario {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.form-label {
	font-size: 1rem;
	font-weight: 600;
	color: $color-primario;
}

.form-input {
	padding: 12px 14px;
	border: 1px solid $color-borde;
	border-radius: 8px;
	font-size: 1rem;
	color: $color-texto-principal;
	font-weight: 500;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;

	&:focus {
		outline: none;
		border-color: $color-primario;
		box-shadow: 0 0 0 3px rgba(0, 60, 88, 0.1);
	}

	&::placeholder {
		color: $color-texto-secundario;
	}
}

.acciones-formulario {
	display: flex;
	gap: 12px;
	justify-content: flex-end;
	margin-top: 12px;
}

.btn-principal,
.btn-secundario {
	border: none;
	border-radius: 10px;
	padding: 10px 24px;
	font-weight: 700;
	cursor: pointer;
	transition: all 0.2s ease;
}

.btn-principal {
	background: $color-primario;
	color: $color-blanco;

	&:hover {
		background: mix($color-blanco, $color-primario, 8%);
	}
}

.btn-secundario {
	background: rgba(0, 60, 88, 0.12);
	color: $color-primario;
	border: 1px solid rgba(0, 60, 88, 0.2);

	&:hover {
		background: rgba(0, 60, 88, 0.18);
	}
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
	.creacion-content {
		margin: 24px auto 48px auto;
	}
	.formulario-panel {
		padding: 24px;
	}
}
</style>
