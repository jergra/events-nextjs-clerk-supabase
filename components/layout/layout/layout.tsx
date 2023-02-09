import {ThemeProvider} from 'next-themes'

interface ILayoutProps {
    children: React.ReactNode
}

export const Layout = ({children} : ILayoutProps) => {

    return (
        <div className='bg-white dark:bg-zinc-900 transition-all duration-700'>
            <ThemeProvider enableSystem={true} attribute="class">
            
                <div>
                    {children}
                </div>
            
            </ThemeProvider>
        </div>
    )
}