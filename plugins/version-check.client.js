export default ({ $config }) => {
  if (process.client) {
    
    const isProd = $config.environment && $config.environment.toLowerCase() === 'staging';

    if (isProd) {
      window.addEventListener('error', (event) => {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        
        if (chunkFailedMessage.test(event.message)) {
          console.warn('Chunk load failed. Likely a new deployment. Refreshing...');
          
          window.location.reload(true);
        }
      }, true);
    }
  }
};