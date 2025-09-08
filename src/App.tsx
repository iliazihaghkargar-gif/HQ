import React, { useEffect, useState } from 'react';
import { Shield, Database, Clock, Settings, Zap, Lock, Users, FileText, LogOut } from 'lucide-react';
import { SecurityProtection } from './security';
import Login from './Login';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize security protection
    const security = SecurityProtection.getInstance();
    
    setIsVisible(true);
    
    // Cleanup on unmount
    return () => {
      security.destroy();
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleDisconnect = () => {
    setIsLoggedIn(false);
  };
  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const contractSections = [
    {
      id: '1',
      icon: <Shield className="w-6 h-6" />,
      title: '1. Omistusoikeus ja lähdekoodin saatavuus',
      content: 'Asiakas (Onyx Alliance) säilyttää täyden omistusoikeuden kehitettyyn ratkaisuun. Kun koko maksu on vastaanotettu, Kehittäjä toimittaa pääsyn koko lähdekoodiin ja lopullisiin sovellustoimituksiin, mukaan lukien kaikki asiaankuuluvat tekniset dokumentaatiot, jotka ovat tarpeen jatkuvaa käyttöä tai tulevaa kehitystä varten.'
    },
    {
      id: '2',
      icon: <Settings className="w-6 h-6" />,
      title: '2. Jatkuva tuki ja ylläpito (valinnainen, mutta erittäin suositeltava)',
      content: 'Tukipalvelut eivät sisälly projektin perushintaan. Sovelluksen tekninen monimutkaisuus ja toiminnallinen merkitys huomioon ottaen on kuitenkin erittäin suositeltavaa tehdä tuki- ja ylläpitosopimus, erityisesti käyttöönoton yhteydessä ja sovelluksen operatiivisen elinkaaren aikana.',
      subcontent: [
        'Isännöinti ja infrastruktuurin hallinta',
        'Jatkuva valvonta ja virheenkorjaukset',
        'Ominaisuuspäivitykset ja tietoturvakorjaukset',
        'Tekninen tuki ja käytettävyyden varmistaminen',
        'Suorituskyvyn optimointi',
        'Katastrofien palautus ja varmuuskopioiden hallinta',
        'Tapahtumavaste ja eskalointimenettelyt',
        'Alustan versiopäivitykset',
        'Julkaisunhallinta ja käyttöönoton tuki',
        'Kolmannen osapuolen integraatioiden ja rajapintojen valvonta'
      ],
      packages: [
        {
          name: 'Basic Support',
          price: '750 € / kk + ALV 25,5 %',
          description: 'Suositellaan alkuvaiheen sovelluksille, joissa tukitarpeet ovat rajalliset.',
          features: [
            'Isännöinti hallinnoidussa infrastruktuurissa (esim. Supabase Cloud)',
            'Enintään 7 tuntia kuukaudessa virheiden korjauksiin ja pieniin päivityksiin',
            'Tietoturvakorjausten valvonta ja soveltaminen',
            'Sähköpostituki, enintään 48 tunnin vasteajalla',
            'Kuukausittainen käytettävyyden raportointi ja infrastruktuurin valvonta'
          ]
        },
        {
          name: 'Professional Support',
          price: '1 500 € / kk + ALV 25,5 %',
          description: 'Suositellaan kehittyville tuotteille, jotka vaativat säännöllistä kehitystä ja teknistä valvontaa.',
          features: [
            'Kaikki Basic-paketin ominaisuudet',
            'Enintään 35 tuntia kuukaudessa ongelmanratkaisuun, kehitystyöhön ja suorituskyvyn optimointiin',
            'Priorisoitu sähköpostituki, enintään 24 tunnin vasteajalla',
            'SLA-pohjainen vasteaika kriittisiin ongelmiin',
            'Kuukausittaiset suorituskyky- ja käytettävyysraportit',
            'CI/CD-putken ja käyttöönoton tukipalvelut'
          ]
        },
        {
          name: 'Premium Support',
          price: '2 500 € / kk + ALV 25,5 %',
          description: 'Suunniteltu liiketoimintakriittisille järjestelmille, jotka edellyttävät kattavaa tukea ja strategista kehitystä.',
          features: [
            'Kaikki Professional-paketin ominaisuudet',
            'Ei tuntirajoitusta kehitykselle, integraatioille tai optimointityölle',
            'Hätätilanteiden vasteaika: 6 tunnin sisällä',
            'Oma asiakkuuspäällikkö, kahden viikon välein pidettävillä katsauksilla',
            'Räätälöity isännöintiinfrastruktuuri, mukaan lukien valinta halutusta pilvitoimittajasta (AWS, GCP, Vercel, jne.)',
            'Räätälöidyt varmuuskopio- ja redundanssijärjestelyt',
            'Neljännesvuosittaiset turvallisuus- ja suorituskykyauditoinnit',
            'Sääntelyvaatimusten tukeminen (esim. GDPR, SOC 2)',
            'Strateginen tiekarttaneuvonta ja kapasiteetin suunnittelu'
          ]
        }
      ]
    },
    {
      id: '3',
      icon: <Lock className="w-6 h-6" />,
      title: '3. Yksinoikeus ja referenssioikeudet',
      content: 'Sovellus kehitetään yksinomaan Asiakkaalle eikä sitä myydä tai uudelleenkäytetä millekään kolmannelle osapuolelle. Kehittäjällä on kuitenkin oikeus luoda johdettu versio sovelluksesta (eri nimellä ja ilman Asiakkaan brändiä tai luottamuksellista tietoa) sisäisiä esittely- ja portfoliotarkoituksia varten. Kehittäjä voi viitata tähän johdettuun versioon tapaustutkimuksena tai konseptitoteutuksena viestiessään potentiaalisten asiakkaiden kanssa. Käyttö tapahtuu tiukasti tietosuojaperiaatteita noudattaen. Onyx Alliancen nimeä, logoa tai brändiä ei käytetä julkisesti ilman erillistä kirjallista lupaa. Lisäehdot tästä aiheesta on esitetty Javierin aiemmin toimittamassa MVP-ehdotuksessa, joka voidaan liittää tähän sopimukseen.'
    },
    {
      id: '4',
      icon: <Clock className="w-6 h-6" />,
      title: '4. Aikataulu ja virstanpylväät',
      content: 'Kehittäjä sitoutuu noudattamaan Asiakkaan esittämää aikataulua ja sovittuja virstanpylväitä. Kaikki muutokset aikatauluun on sovittava kirjallisesti ja ne voivat johtaa toimitusaikataulun tai laajuuden tarkistamiseen.'
    },
    {
      id: '5',
      icon: <Shield className="w-6 h-6" />,
      title: '5. Kolmannen osapuolen vastuu ja takuu',
      content: 'Kehittäjä ei ole vastuussa kolmansien osapuolten palveluiden (esim. isännöintipalvelut, API-häiriöt, yhteysongelmat) aiheuttamista virheistä tai käyttökatkoksista, eikä sovelluksen väärinkäytöstä aiheutuneista vahingoista. Mikäli väärinkäyttö havaitaan, Kehittäjä toteuttaa kohtuulliset toimet estääkseen sen uudelleen esiintymisen.',
      warranty: {
        title: 'Takuuaika',
        content: 'Sovellus kuuluu rajoitetun takuun piiriin 90 kalenteripäivän ajan lopullisesta toimituksesta. Tänä aikana Kehittäjä korjaa kaikki todennettavat virheet tai viat, jotka rikkovat sovittuja teknisiä määrittelyjä, ilman lisäkustannuksia.',
        exclusions: [
          'Virheet, jotka johtuvat sovelluksen väärinkäytöstä tai luvattomista muutoksista',
          'Ulkoisten palveluiden, komponenttien tai riippuvuuksien virheet',
          'Muutokset, jotka johtuvat kolmansien osapuolien vaatimusten muuttumisesta'
        ]
      }
    },
    {
      id: '6',
      icon: <Database className="w-6 h-6" />,
      title: '6. Tietojenkäsittely ja GDPR-vaatimusten noudattaminen',
      content: 'Sovellus voi käsitellä käyttäjätietoja, mukaan lukien mutta ei rajoittuen jäsenyystietoihin, yhteystietoihin ja toimintalokeihin. Kaikki tietojenkäsittely suoritetaan Euroopan parlamentin ja neuvoston asetuksen (EU) 2016/679 (yleinen tietosuoja-asetus, "GDPR") mukaisesti.',
      roles: [
        'Asiakas (Onyx Alliance) toimii rekisterinpitäjänä ja vastaa tietojenkäsittelyn tarkoituksesta ja laillisesta perusteesta.',
        'Kehittäjä toimii henkilötietojen käsittelijänä ja käsittelee tietoja ainoastaan Asiakkaan ohjeiden mukaisesti.',
        'Supabase Cloud toimii alikäsittelijänä ja tarjoaa hosting-infrastruktuurin ja tietovarastopalvelut.'
      ],
      security: [
        'AES-256-salaus levossa olevalle tiedolle',
        'TLS-salaus tiedonsiirrossa',
        'Roolipohjainen käyttöoikeuksien hallinta (RBAC) ja rivikohtainen tietoturva (RLS)',
        'Päivittäiset varmuuskopiot ja palautusprosessit'
      ]
    },
    {
      id: '7',
      icon: <Zap className="w-6 h-6" />,
      title: '7. Maksuehdot',
      content: 'Sovelluksen kehittämisestä ja toimittamisesta sovittu kokonaishinta on 50 000 € + ALV 25,5 %, joka maksetaan projektiehdotuksessa esitetyn maksuaikataulun mukaisesti. Sovelluksesta on saatavilla vaihtoehtoinen demoversio hintaan 5 000 € + ALV 25,5 %. Jatkuva tuki ja palvelut käyttöönoton jälkeen eivät sisälly tähän hintaan ja on hankittava erikseen (katso kohta 2).'
    },
    {
      id: '8',
      icon: <FileText className="w-6 h-6" />,
      title: '8. Immateriaalioikeudet ja brändäys',
      content: 'Kaikki Asiakkaan toimittama luova sisältö ja brändimateriaali (kuten logot, kuvat, tekstit ja verkkotunnukset) säilyvät Asiakkaan yksinomaisena omaisuutena. Kun koko maksu on vastaanotettu, Asiakas saa täyden omistusoikeuden sovellukseen, mukaan lukien lähdekoodi ja kaikki tekniset dokumentaatiot.',
      exceptions: [
        'Projektissa käytetyt avoimen lähdekoodin kirjastot tai työkalut',
        'Kehittäjän ennen tätä toimeksiantoa luomat valmiit kehityskehykset tai sisäiset moduulit'
      ]
    },
    {
      id: '9',
      icon: <Users className="w-6 h-6" />,
      title: '9. Projektin peruutusehdot',
      content: 'Mikäli projekti peruutetaan kehityksen jo alettua, hyvityksiä ei taata johtuen käytetystä ajasta, resursseista ja henkisestä työstä. Kehittäjä on kuitenkin valmis neuvottelemaan kohtuullisesta ratkaisusta. Jos sovintoa ei saavuteta, asia ratkaistaan voimassa olevan lain mukaisesti.'
    },
    {
      id: '10',
      icon: <Settings className="w-6 h-6" />,
      title: '10. Lisäominaisuudet ja tuleva työ',
      content: 'Kaikki alkuperäisen projektin ulkopuoliset ominaisuuspyynnöt – kuten tekoälyintegraatiot, kolmannen osapuolen automaatiot tai chatbotit – käsitellään erillisinä projekteina ja niihin sovelletaan omia ehtoja, aikatauluja ja hintoja. Nämä lisäkehitykset eivät vaikuta nykyisen sovelluksen toimintaan, ellei toisin ole kirjallisesti sovittu.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-auto">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Disconnect Button */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={handleDisconnect}
            className="group relative bg-red-600/80 hover:bg-red-500 backdrop-blur-sm rounded-full p-3 border border-red-500/50 hover:border-red-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-400/25"
            title="Disconnect and return to login"
          >
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <LogOut className="relative w-5 h-5 text-white group-hover:text-red-100 transition-colors duration-300" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-black/90 backdrop-blur-sm text-red-300 text-sm px-3 py-2 rounded-lg border border-red-500/30 whitespace-nowrap">
                Disconnect Session
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
              </div>
            </div>
          </button>
        </div>

        {/* Header - Parties */}
        <div className={`mb-12 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Floating background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-32 right-1/3 w-24 h-24 bg-emerald-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-10 right-1/4 w-40 h-40 bg-cyan-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Main Header Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Top Level - Subtitle */}
            <div className="mb-16">
              <div className="relative inline-block px-8 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-green-400/30">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full animate-pulse"></div>
                <h2 className="relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                  Yhteistyön Ehdot
                </h2>
              </div>
            </div>

            {/* Main Level - Parties */}
            <div className="flex justify-center">
              <div className="max-w-5xl w-full">
                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl mx-auto hidden lg:block">
                    <div className="relative h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                    </div>
                  </div>

                  {/* Envaire Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-green-400/30 group-hover:border-green-400/50 transition-all duration-300 p-6 min-w-[280px]">
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-400/20 rounded-full border border-green-400/40">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-green-300">ACTIVE</span>
                        </div>
                      </div>
                      <div className="text-center pt-4">
                        <div className="inline-block px-4 py-1 bg-green-400/10 rounded-full border border-green-400/30 mb-4">
                          <span className="text-sm font-bold text-green-300">DEVELOPER</span>
                        </div>
                        <div className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                          ENVAIRE
                        </div>
                        <div className="text-sm text-gray-400">Technical Solutions</div>
                      </div>
                    </div>
                  </div>

                  {/* Central Collaboration Symbol */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="relative bg-black/60 backdrop-blur-sm rounded-full p-4 border border-green-400/40">
                        <div className="text-4xl text-green-400 animate-pulse">⚡</div>
                      </div>
                    </div>
                  </div>

                  {/* Onyx Alliance Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-emerald-400/30 group-hover:border-emerald-400/50 transition-all duration-300 p-6 min-w-[280px]">
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/20 rounded-full border border-emerald-400/40">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold text-emerald-300">ENGAGED</span>
                        </div>
                      </div>
                      <div className="text-center pt-4">
                        <div className="inline-block px-4 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/30 mb-4">
                          <span className="text-sm font-bold text-emerald-300">CLIENT</span>
                        </div>
                        <div className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                          ONYX ALLIANCE
                        </div>
                        <div className="text-sm text-gray-400">Strategic Partnership</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Contract Card */}
        <div className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-3xl blur-sm opacity-30 animate-pulse"></div>
            
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-green-500/50 shadow-2xl overflow-hidden">
              {/* Header with animated lines */}
              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 border-b border-green-500/30">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  SOPIMUSEHDOT
                </h2>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              </div>

              {/* Contract Content */}
              <div className="p-8 space-y-8">
                {contractSections.map((section, index) => (
                  <div 
                    key={section.id}
                    className={`transform transition-all duration-700 delay-${(index + 1) * 100} ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                  >
                    <div className="group relative bg-black/30 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10">
                      {/* Section Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0 p-2 bg-green-500/10 rounded-lg border border-green-500/30 group-hover:bg-green-500/20 transition-all duration-300">
                          {/* Glowing background effect */}
                          <div className="absolute -inset-1 bg-green-400/20 rounded-lg blur-sm animate-pulse opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                          <div className="relative text-green-400 group-hover:text-green-300 transition-all duration-300 animate-pulse">
                            {section.icon}
                          </div>
                        </div>
                        <div className="relative">
                          {/* Glowing title effect */}
                          <div className="absolute -inset-1 bg-green-400/10 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                          <h3 className="relative text-xl font-bold text-green-200 group-hover:text-white transition-all duration-300 drop-shadow-lg">
                            <span className="relative z-10 bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-green-100">
                              {section.title}
                            </span>
                            {/* Text glow effect */}
                            <div className="absolute inset-0 text-green-300 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                              {section.title}
                            </div>
                          </h3>
                        </div>
                      </div>

                      {/* Main Content */}
                      <p className="text-gray-200 leading-relaxed mb-4 text-base font-light">
                        {section.content}
                      </p>

                      {/* Subcontent for section 2 */}
                      {section.subcontent && (
                        <div className="mb-6">
                          <h4 className="text-green-300 font-semibold mb-3">Palvelut sisältävät:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.subcontent.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                                <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0"></div>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Support Packages */}
                      {section.packages && (
                        <div className="space-y-4">
                          <h4 className="text-green-300 font-semibold text-lg mb-4">Kuukausittaiset tukipaketit:</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {section.packages.map((pkg, idx) => (
                              <div 
                                key={idx} 
                                className={`relative group bg-gray-800/50 rounded-xl p-6 border border-green-500/20 hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20 transform hover:-translate-y-2 cursor-pointer ${
                                  idx === 1 ? 'ring-2 ring-green-400/30 bg-gradient-to-br from-gray-800/70 to-gray-900/70' : ''
                                }`}
                                style={{
                                  animationDelay: `${idx * 200}ms`
                                }}
                              >
                                {/* Animated background glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/0 via-green-400/20 to-emerald-400/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                                
                                {/* Top animated border */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/0 via-green-400/70 to-green-400/0 rounded-t-xl">
                                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400 to-green-400/0 animate-pulse"></div>
                                </div>
                                
                                {/* Popular badge for middle card */}
                                {idx === 1 && (
                                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div className="relative">
                                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm animate-pulse"></div>
                                      <div className="relative bg-green-400 text-black px-4 py-1 rounded-full text-xs font-bold animate-bounce">
                                        RECOMMENDED
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Card content */}
                                <div className="relative z-10">
                                  <h5 className="text-green-300 font-bold text-xl mb-3 group-hover:text-white transition-all duration-300 drop-shadow-lg">
                                    <span className="relative">
                                      {pkg.name}
                                      <div className="absolute inset-0 text-green-300 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                                        {pkg.name}
                                      </div>
                                    </span>
                                  </h5>
                                  
                                  <div className="relative mb-4">
                                    <div className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-all duration-300 group-hover:scale-110 transform">
                                      {pkg.price}
                                    </div>
                                    <div className="absolute inset-0 text-green-400 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 font-bold text-2xl">
                                      {pkg.price}
                                    </div>
                                  </div>
                                  
                                  <p className="text-gray-300 text-sm mb-6 group-hover:text-gray-200 transition-all duration-300 font-light leading-relaxed">
                                    {pkg.description}
                                  </p>
                                <div className="space-y-2">
                                  {pkg.features.map((feature, fidx) => (
                                    <div 
                                      key={fidx} 
                                      className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-all duration-300"
                                      style={{
                                        animationDelay: `${(idx * 200) + (fidx * 100)}ms`
                                      }}
                                    >
                                      <div className="relative mt-2 flex-shrink-0">
                                        <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-all duration-300 group-hover:scale-125 animate-pulse"></div>
                                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                      </div>
                                      <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Bottom glow effect */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Warranty section */}
                      {section.warranty && (
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-green-500/20">
                          <h4 className="text-green-300 font-semibold mb-2">{section.warranty.title}</h4>
                          <p className="text-gray-400 text-sm mb-3">{section.warranty.content}</p>
                          <div className="text-gray-400 text-sm">
                            <div className="text-green-300 font-medium mb-2">Takuu ei kata:</div>
                            {section.warranty.exclusions.map((exclusion, idx) => (
                              <div key={idx} className="flex items-start gap-2 mb-1">
                                <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{exclusion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Roles section */}
                      {section.roles && (
                        <div className="mt-4">
                          <h4 className="text-green-300 font-semibold mb-3">Roolit ja vastuut:</h4>
                          {section.roles.map((role, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm mb-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {role}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Security section */}
                      {section.security && (
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-green-500/20">
                          <h4 className="text-green-300 font-semibold mb-3">Tietoturvaprotokollat:</h4>
                          {section.security.map((protocol, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm mb-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {protocol}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Exceptions section */}
                      {section.exceptions && (
                        <div className="mt-4">
                          <h4 className="text-green-300 font-semibold mb-3">Lukuun ottamatta:</h4>
                          {section.exceptions.map((exception, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm mb-2">
                              <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              {exception}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with animated border */}
              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 border-t border-green-500/30">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-green-400">
                    <Zap className="w-5 h-5" />
                    <span className="font-semibold">POWERED BY ENVAIRE</span>
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default App;