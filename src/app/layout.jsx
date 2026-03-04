import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata = {
  title: 'Regunaut Workflow Builder',
  description: 'Build regulatory workflows with drag-and-drop',
  icons: {
    icon: '/Regunaut FavIcon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>
        {children}
      </body>
    </html>
  );
}
