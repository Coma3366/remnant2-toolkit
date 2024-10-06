import * as React from "react"
import { type SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="currentColor" 
    viewBox="0 0 64.48 114.149"
    {...props}
  >
    <path
      d="M129.476 132.039c-.637-.046-1.273.287-1.273 1.137v35.29c-1.992 2.41-5.563 3.537-8.25 5.963-2.362 2.132-4.3 5.592-3.63 10.103.082.556.515.794.98.797.6.004 1.253-.382 1.288-.985.2-3.44.89-5.796 2.431-7.575 2.197-2.537 6.133-3.588 8.454-5.7 2.322 2.112 6.258 3.163 8.455 5.7 1.54 1.78 2.231 4.135 2.431 7.575.062 1.072 2.08 1.459 2.269.188.67-4.511-1.269-7.971-3.63-10.103-2.688-2.426-6.259-3.554-8.25-5.964v-35.29c0-.666-.638-1.09-1.275-1.136zm.024 52.36c-.298.012-.637.152-1.002.522l-6.346 6.44c-.569.576-.598 1.298 0 1.914l6.215 6.402c.728.75 1.571.576 2.103.038l6.29-6.364c.532-.54.62-1.361-.057-2.066l-6.12-6.364c-.201-.21-.586-.543-1.083-.522zm-.018 2.976c.31-.012.548.195.673.325l3.812 3.964c.422.439.367.95.035 1.286l-3.917 3.964c-.33.335-.856.444-1.31-.024l-3.87-3.986c-.372-.384-.354-.834 0-1.193l3.952-4.011c.227-.23.439-.317.624-.325zm-31.26 6.148c-1.652 0-1.258 2.363-.331 2.362l19.694-.023c1.177-.001 1.275-2.339 0-2.339zm43.064 0c-1.652 0-1.258 2.363-.33 2.362l19.694-.023c1.176-.001 1.274-2.339 0-2.339zm-23.983 5.586c-.465.003-.898.242-.98.798-.67 4.511 1.268 7.971 3.63 10.103 2.687 2.426 6.258 3.554 8.25 5.964v29.069c0 1.7 2.547 1.332 2.547 0v-29.07c1.992-2.41 5.563-3.537 8.25-5.963 2.362-2.132 4.301-5.592 3.63-10.103-.188-1.271-2.206-.884-2.268.187-.2 3.44-.89 5.797-2.43 7.576-2.198 2.537-6.134 3.588-8.456 5.7-2.32-2.112-6.257-3.163-8.454-5.7-1.54-1.78-2.232-4.136-2.431-7.576-.035-.603-.689-.988-1.288-.985z"
      transform="translate(-97.089 -132.035)"
    />
  </svg>
)
export default SvgComponent
