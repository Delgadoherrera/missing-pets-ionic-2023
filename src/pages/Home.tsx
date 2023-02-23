import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import LogoutButton from "../components/LogoutButton";
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp,scanOutline, earthOutline,personCircleOutline, heartOutline, heartSharp, logOut, readerOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import '../components/Menu.css';
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/LoginButton';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Mascotas perdidas',
    url: '/page/Mascotas perdidas',
    iosIcon: readerOutline,
    mdIcon: earthOutline
  },
  {
    title: 'Mascotas en adopcion',
    url: '/page/Mascotas en adopcion',
    iosIcon: heartSharp,
    mdIcon: heartSharp
  },
  {
    title: 'Encontre una mascota',
    url: '/page/Encontre una mascota',
    iosIcon: heartOutline,
    mdIcon: scanOutline
  },
  {
    title: 'Mis mascotas',
    url: '/page/Mis mascotas',
    iosIcon: archiveOutline,
    mdIcon: heartOutline
  },
  {
    title: 'Mi perfil',
    url: '/page/Mi perfil',
    iosIcon: trashOutline,
    mdIcon: personCircleOutline
  },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const { isLoading, isAuthenticated, user } = useAuth0();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        {user !== undefined ? <IonList id="inbox-list">
          <IonListHeader></IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          {isAuthenticated ? <LogoutButton />
            : null}

        </IonList> : null}


        {/*   <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
