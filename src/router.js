import { createRouter, createWebHistory } from 'vue-router';
import PrimeiraPagina from './components/PrimeiraPagina.vue';
import LoginPage from './components/Login.vue';
import WelcomePage from './components/WelcomePage.vue';
import InicioPeritoPage from './components/InicioPeritos.vue'; // Rota para peritos
import AuditoriasPage from './components/AuditoriasPeritos.vue';
import UserProfilePeritos from './components/UserProfilePeritos.vue';
import EditarPerfilPeritos from './components/EditarPerfilPeritos.vue';
import RelatorioPage from './components/Relatorio.vue';
import VisualizarRelatorio from './components/VisualizarRelatorio.vue';
import NotificacoesView from './components/NotificacoesPeritos.vue';
import InicioPage from './components/Inicio.vue';
import BemVindo from './components/BemVindo.vue';
import UserProfile from './components/UserProfile.vue';
import EditarPerfil from './components/EditarPerfil.vue';
import RegistoOcorrencia from './components/RegistoOcorrencia.vue';
//import OcorrenciaDetalhe from './components/OcorrenciaDetalhe.vue'; 
import Notificacoes from './components/Notificacoes.vue';
import OcorrenciasPage from './components/OcorrenciasPage.vue';
import Avaliacao from './components/Avaliacao.vue';

const routes = [
  { path: '/', component: PrimeiraPagina },
  { path: '/login', component: LoginPage },
  { path: '/welcome', component: WelcomePage },
  { path: '/inicio-peritos', component: InicioPeritoPage }, // Rota para peritos
  { path: '/auditoria-perito', component: AuditoriasPage },
  { path: '/perfil-perito', component: UserProfilePeritos },
  { path: '/editar-perfil-perito', component: EditarPerfilPeritos },
  { path: '/relatorio/:id', component: RelatorioPage },
  { path: '/visualizar-relatorio/:id', component: VisualizarRelatorio },
  { path: '/notificacoes-perito', component: NotificacoesView },
  { path: '/inicio', component: InicioPage },
  { path: '/bem-vindo', component: BemVindo },
  { path: '/perfil', component: UserProfile },
  { path: '/editar-perfil', component: EditarPerfil },
  { path: '/auditorias', component: OcorrenciasPage },
  { path: '/registar-ocorrencia', component: RegistoOcorrencia },
  { path: '/ocorrencia/:id', component: () => import ('@/components/OcorrenciaDetalhe.vue'), props: true, },
  { path: '/notificacoes', component: Notificacoes },
  { path: '/avaliacao', component: Avaliacao },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global para redirecionar com base no tipo de usuário
router.beforeEach((to, from, next) => {
  const userType = localStorage.getItem('userType'); // 'perito' ou 'cliente'

  // Se o usuário tentar acessar a PrimeiraPagina após login, redireciona para a página correta
  if (to.path === '/' && userType) {
    if (userType === 'perito') {
      next('/inicio-peritos'); // Redireciona para a página dos peritos
    } else {
      next('/inicio'); // Redireciona para a página dos clientes
    }
  } else {
    next(); // Permite a navegação para outras rotas
  }
});

export default router;
