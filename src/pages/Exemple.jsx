import React from "react";
import LayoutHeader from '../layouts/App';

const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const RemoteReactComponent = ({ url, scope, module, ...props }) => {
  const { ready, failed } = useDynamicScript(url);

  if(!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if(failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(
    async () => 
      await window[scope].get(module).then((factory) => {
        const Module = factory();
        return Module;
      })
  );
  
  return (
    <React.Suspense fallback="Loading System">
      <Component {...props} />
    </React.Suspense>
  );
};


function Create() {
    const pathname = window.location.pathname;

    return (
        <LayoutHeader>
            <div style={{padding: 10}}>
                <h2>O Conteudo abaixo é um micro-frontend</h2>
                <RemoteReactComponent
                    url="https://mybucketms1.s3.us-east-2.amazonaws.com/dist/Root/remoteEntry.js"
                    module="Root" 
                    scope="Root"
                    basename={pathname.split('/')[1]}/>
            </div>
        </LayoutHeader>
    );
}

export default Create;
