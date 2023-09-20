
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar/NavBar'
import { SoundBar } from '../components/soundBar/SoundBar'
import { UserContextProvider } from '../context/UserContextProvider'
import { TrackListContextProvider } from '../context/TrackListContextProvider'
import { ListDetailContextProvider } from '../context/ListDetailContextProvider'
import { IsPlayingContextProvider } from '../context/IsPlayingContextProvider'
import { SelectedUserContextProvider } from '../context/SelectedUserContextProvider'
import { GenreContextProvider } from '../context/GenresContext'
import { TopTrendsContextProvider } from '../context/TopTrendsContextProvider'
import { UserLibraryListContextProvider } from '../context/UserLibraryListContextProvider'

export const Layout = () => {
  return (
    <>
      <UserContextProvider>
        <TrackListContextProvider>
          <ListDetailContextProvider>
            <IsPlayingContextProvider>
              <TopTrendsContextProvider>
                <SelectedUserContextProvider>
                  <GenreContextProvider>
                    <UserLibraryListContextProvider>
                      <Outlet />
                      <SoundBar />
                      <NavBar />
                    </UserLibraryListContextProvider>
                  </GenreContextProvider>
                </SelectedUserContextProvider>
              </TopTrendsContextProvider>
            </IsPlayingContextProvider>
          </ListDetailContextProvider>
        </TrackListContextProvider>
      </UserContextProvider>
    </>
  )
}
