export default function Layout(props) {

    const { children } = props

    return(
        <div>
            <h1 className="text-gradient">derision</h1>
                {children}
            <footer>
                <small>Created by</small>
                <a target="_blank" href="https://github.com/riccardo-pavan">
                    <img 
                    alt="pfp" 
                    src="https://avatars.githubusercontent.com/u/124668871?s=400&u=6aa65b238ea33fbcf5eece999976ddd67f6d76a7&v=4"/>
                    <p>@riccardo-pavan</p>
                    <i className="fa-brands fa-github"></i>
                </a>
            </footer>
        </div>
    )
}