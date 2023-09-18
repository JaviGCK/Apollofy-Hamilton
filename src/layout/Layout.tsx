
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'
import { SoundBar } from '../components/soundBar/SoundBar'
import { UserContextProvider } from '../context/UserContextProvider'
import { TrackListContextProvider } from '../context/TrackListContextProvider'
import { ListDetailContextProvider } from '../context/ListDetailContextProvider'
import { IsPlayingContextProvider } from '../context/IsPlayingContextProvider'
import { TrackIdsContextProvider } from '../context/TrackIdsContextProvider'
import { SelectedUserContextProvider } from '../context/SelectedUserContextProvider'

export const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <TrackListContextProvider>
          <ListDetailContextProvider>
            <IsPlayingContextProvider>
              <TrackIdsContextProvider>
                <SelectedUserContextProvider>
                  <Outlet />
                  <SoundBar />
                  <NavBar />
                </SelectedUserContextProvider>
              </TrackIdsContextProvider>
            </IsPlayingContextProvider>
          </ListDetailContextProvider>
        </TrackListContextProvider>
      </UserContextProvider>
    </>
  )
}
