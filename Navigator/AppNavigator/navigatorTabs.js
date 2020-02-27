/**
 * Abas principais
 * @author Davi Souto
 * @since 20/01/2020
 */
import ScreenProfile from '@App/screens/Profile';
// import ScreenExplore from '@App/screens/Explore';
import ScreenProximity from '@App/screens/Proximity';

const navigatorTabs = {
    Profile: {
      title: 'Perfil',
      screen: ScreenProfile,
      icon: 'user',
    },
    // Explore: {
    //   title: 'Explorar',
    //   screen: ScreenExplore,
    //   icon: 'globe',
    // },
    Proximity: {
      title: 'Proximidades',
      screen: ScreenProximity,
      icon: 'share-alt'
    }
  };

export default navigatorTabs;
