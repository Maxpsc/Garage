import React, { useState, useEffect } from 'react';
import { Hook, Unhook, Console } from 'console-feed';

const Panel: React.FC = () => {
	const [logs, setLogs] = useState<any[]>([]);
	
	// @ts-ignore
	useEffect(() => {
		Hook(window.console, (log: any) => {
			setLogs((currLogs) => [...currLogs, log])
		}, false)
		// @ts-ignore
    return () => Unhook(window.console)
	}, []);

	return (
    <div className="console-wrap">
      <Console logs={logs} variant="dark" />
    </div>
  );
};

export default Panel;