export const DIAS_SEMANA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const PASTORAIS_DATA = [
  {
    id: '1',
    nome: 'Pastoral da Via Sacra',
    descricao:
      'A Pastoral da Via Sacra evangeliza pela encenação da Paixão e morte de Jesus Cristo nas ruas da cidade. Nossa missão funciona intensamente no período da Quaresma, preparando atores, figurinos, cenários complexos, divulgação e toda a logística de cozinha e autorizações governamentais. Para participar, o fiel deve se integrar às reuniões preparatórias que começam sempre antes do carnaval. Nossos encontros ocorrem aos sábados que antecedem a Semana Santa, unindo arte e fé.',
    corCamiseta: '#EF4444',
    nomeCor: 'Vermelha',
    imagem: { uri: 'https://picsum.photos/id/1015/600/400' },
    imagemLista: { uri: 'https://picsum.photos/id/1015/150/150' },
  },
  {
    id: '2',
    nome: 'Liturgia Infantil',
    setor: 'Setor Litúrgico',
    descricao:
      'Esta pastoral cuida do serviço litúrgico na Missa dominical das 09:00, promovendo a evangelização e a formação lúdica das crianças paroquianas. A equipe realiza os cantos, as leituras, o salmo, o ofertório e encenações bíblicas adaptadas. Para participar, a criança deve ter no mínimo 8 anos, autorização dos pais e disponibilidade para o serviço atribuído. Os encontros são semanais, todos os sábados, das 10:00 às 12:00 no salão paroquial.',
    corCamiseta: '#3B82F6',
    nomeCor: 'Azul Celeste',
    imagem: { uri: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=500' },
    imagemLista: { uri: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=150' },
  },
  {
    id: '3',
    nome: 'PASCOM',
    setor: 'Setor Comunicação',
    descricao:
      'A Pastoral da Comunicação é o conjunto de ações que auxilia a Igreja em sua missão de manter um diálogo constante com a sociedade moderna. Nossa missão envolve o gerenciamento das redes sociais, fotografia das missas e a ponte entre a paróquia e a comunidade. É necessário ter disposição para aprender e se dedicar às ferramentas tecnológicas em favor da evangelização. As reuniões ocorrem mensalmente ou conforme a necessidade dos eventos paroquiais.',
    corCamiseta: '#10B981',
    nomeCor: 'Verde Bandeira',
    imagem: { uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500' },
    imagemLista: { uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=150' },
  },
  {
    id: '4',
    nome: 'MESCE',
    descricao:
      'Os Ministros Extraordinários da Sagrada Comunhão expressam o cuidado pastoral e o zelo da Igreja pelos enfermos, auxiliando o Padre na distribuição da Eucaristia. Nossa missão é levar o corpo de Cristo aos doentes em suas casas, distribuir a comunhão nas missas e presidir celebrações da palavra quando necessário. Os membros são escolhidos pelo Pároco e devem realizar um curso de formação inicial e anual. As reuniões fixas ocorrem na segunda sexta-feira de cada mês.',
    corCamiseta: '#94A3B8',
    nomeCor: 'Branca',
    imagem: { uri: 'https://picsum.photos/id/65/600/400' },
    imagemLista: { uri: 'https://picsum.photos/id/65/150/150' },
  },
  {
    id: '5',
    nome: 'Pastoral Familiar',
    setor: 'Setor Vida e Família',
    descricao:
      'Este é um serviço de apoio à Família para que viva dignamente e estabeleça relacionamentos fundados em valores evangélicos. A missão é transformar cada lar em uma Igreja doméstica missionária e santuário da vida. Atuamos no acolhimento de casais, preparação para o matrimônio e apoio no papel educador dos pais. Os interessados devem comparecer às reuniões quinzenais que acontecem às quartas-feiras, a partir das 20:00, para formação e planejamento de ações sociais.',
    corCamiseta: '#8B5CF6',
    nomeCor: 'Roxa',
    imagem: { uri: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=500' },
    imagemLista: { uri: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=150' },
  },
  {
    id: '6',
    nome: 'ECC',
    setor: 'Setor Vida e Família',
    descricao:
      'O Encontro de Casais com Cristo é um serviço da Igreja para evangelizar a família em três etapas distintas, focando no relacionamento conjugal e na fé batismal. A primeira etapa foca no chamamento, a segunda na reflexão sobre documentos da Igreja e a terceira na dignidade humana e justiça social. Para participar, o casal deve realizar o encontro anual oferecido pela paróquia. Nossos encontros comunitários ocorrem nas missas do segundo sábado de cada mês, às 18:00, com todos os casais.',
    corCamiseta: '#F59E0B',
    nomeCor: 'Laranja',
    imagem: { uri: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=500' },
    imagemLista: { uri: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=150' },
  },
];

/**
 * API Liturgia Diária — orações e leituras da Santa Missa em português.
 * Documentação: https://github.com/Dancrf/liturgia-diaria
 */
export const API_LITURGIA_URL = 'https://liturgia.up.railway.app/v2/?periodo=7';

export const CORES_LITURGICAS = {
  Branco: '#F8FAFC',
  Verde: '#16A34A',
  Vermelho: '#DC2626',
  Roxo: '#7C3AED',
  Rosa: '#EC4899',
};
