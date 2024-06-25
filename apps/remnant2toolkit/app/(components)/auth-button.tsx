'use client'

import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import getAvatarId from '@/app/(actions)/profile/get-avatar-id'
import { Link } from '@repo/ui/base/link'
import { PlaceHolderIcon } from '@/app/(components)/placeholder-icon'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { cn } from '@/app/(utils)/classnames'
import { getImageUrl } from '@/app/(utils)/get-image-url'
import { getAvatarById } from '@/app/profile/[userId]/(lib)/get-avatar-by-id'

function AuthButtonComponent({ variant }: { variant: 'mobile' | 'desktop' }) {
  const { data: session, status } = useSession()

  const [profileImage, setProfileImage] = useState<string | undefined>(
    session?.user?.image ?? undefined,
  )

  useEffect(() => {
    async function getAvatarIdAsync() {
      const response = await getAvatarId()
      if (response.avatarId) {
        const avatar = getAvatarById(response.avatarId)
        setProfileImage(getImageUrl(avatar.imagePath))
      }
    }
    getAvatarIdAsync()
  }, [])

  if (variant === 'mobile')
    return (
      <div className="space-y-2">
        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user?.id}?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.profile.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.profile.label}

              <p className="mt-1 text-xs text-gray-400">
                {NAV_ITEMS.profile.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user
              ?.id}/created-builds?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.myBuilds.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.myBuilds.label}

              <p className="mt-1 text-xs text-gray-400">
                {NAV_ITEMS.myBuilds.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user
              ?.id}/favorited-builds?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.favoritedBuilds.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.favoritedBuilds.label}

              <p className="mt-1 text-xs text-gray-400">
                {NAV_ITEMS.favoritedBuilds.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user?.id}/loadouts?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.loadouts.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.loadouts.label}

              <p className="mt-1 text-xs text-gray-400">
                {NAV_ITEMS.loadouts.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user?.id}/linked-builds?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.linkedBuilds.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.linkedBuilds.label}

              <p className="mt-1 text-xs text-gray-400">
                {NAV_ITEMS.linkedBuilds.description}
              </p>
            </div>
          </Link>
        ) : null}

        {status !== 'authenticated' || !session?.user ? (
          <Link
            href={NAV_ITEMS.signin.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.signin.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2 text-sm">
              {NAV_ITEMS.signin.label}
            </div>
          </Link>
        ) : (
          <Link
            href={NAV_ITEMS.signout.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.signout.icon
              className="text-primary-500 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.signout.label}
            </div>
          </Link>
        )}
      </div>
    )

  // Desktop
  return status !== 'authenticated' || !session?.user ? (
    <Link
      href={NAV_ITEMS.signin.href}
      className={cn(
        'bg-secondary-700 text-surface-solid hover:bg-secondary-500 hidden flex-row items-center justify-start rounded-lg p-2 text-xs font-semibold lg:flex',
      )}
    >
      {NAV_ITEMS.signin.label}
    </Link>
  ) : (
    <Menu as="div" className="relative hidden lg:block">
      <Menu.Button className="bg-background focus:ring-surface-solid flex h-[56px] w-[56px] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        {session?.user?.image ? (
          <img
            src={profileImage}
            className="border-secondary-700 h-[56px] w-[56px] overflow-hidden rounded-full border p-1"
            alt={`${session?.user.name} Avatar`}
          />
        ) : (
          <span className="border-secondary-700 h-[56px] w-[56px] overflow-hidden rounded-full border bg-gray-100 p-1">
            <PlaceHolderIcon />
          </span>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            'bg-background-solid absolute right-0 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none',
          )}
        >
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user?.id}?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                  )}
                >
                  <NAV_ITEMS.profile.icon className="text-primary-600 mr-1 h-4 w-4" />
                  {NAV_ITEMS.profile.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user?.id}/created-builds`}
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                  )}
                >
                  <NAV_ITEMS.myBuilds.icon className="text-primary-600 mr-1 h-4 w-4" />
                  {NAV_ITEMS.myBuilds.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user
                    ?.id}/linked-builds?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex flex-row items-center justify-start  px-4 py-2 text-sm text-gray-300',
                  )}
                >
                  <NAV_ITEMS.linkedBuilds.icon className="text-primary-600 mr-1 h-4 w-4" />
                  {NAV_ITEMS.linkedBuilds.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user
                    ?.id}/favorited-builds?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex flex-row items-center justify-start  px-4 py-2 text-sm text-gray-300',
                  )}
                >
                  <NAV_ITEMS.favoritedBuilds.icon className="text-primary-600 mr-1 h-4 w-4" />
                  {NAV_ITEMS.favoritedBuilds.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user
                    ?.id}/loadouts?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex flex-row items-center justify-start  px-4 py-2 text-sm text-gray-300',
                  )}
                >
                  <NAV_ITEMS.loadouts.icon className="text-primary-600 mr-1 h-4 w-4" />
                  {NAV_ITEMS.loadouts.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          <Menu.Item>
            {({ active }) => (
              <Link
                href={NAV_ITEMS.signout.href}
                className={cn(
                  active ? 'bg-gray-800' : '',
                  'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                )}
              >
                <NAV_ITEMS.signout.icon className="text-primary-600 mr-1 h-4 w-4" />
                {NAV_ITEMS.signout.label}
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const AuthButton = {
  Desktop: () => <AuthButtonComponent variant="desktop" />,
  Mobile: () => <AuthButtonComponent variant="mobile" />,
}
