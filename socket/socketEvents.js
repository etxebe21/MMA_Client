import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';

function SocketListener(props) {
	const { currentSocketEvent } = props;
	const [currentEvent, setEvent] = useState(currentSocketEvent);
	const { handleGlobalState } = useContext(Context);
	const { artifactsGlobalState, setArtefactsGlobalState } = useContext(Context);
	const { pendingTextGlobalState, setPendingTextGlobalState } = useContext(Context);

	useEffect(() => {
		setEvent(currentSocketEvent);
	}, [currentSocketEvent]);

	useEffect(() => {
		if (currentEvent !== null) {
			const handler = handlers[currentEvent.event];
			if (handler)
			{
				handler(currentEvent.value);
			}
		}
		else return;
	}, [currentEvent]);

	const handleAcoliteStamina = (data) => { handleGlobalState({ stamina: data }) };
	const handleAcoliteLife = (data) => { handleGlobalState({ life: data }) };
	const handleAcoliteGold = (data) => { handleGlobalState({ gold: data }) };
	const handleAcoliteXperience = (data) => { handleGlobalState({ xp: data }) };
	const handleNewAcolite = (data) => { handleGlobalState({ user: data }) };
	const handleArtifacts = (data) => {
		setArtefactsGlobalState(data);
		console.log(artifactsGlobalState);
	};
	const handleVerify = (data) => {
		setPendingTextGlobalState(data.state);
	}

	const handlers = {
		stamina: handleAcoliteStamina,
		life: handleAcoliteLife,
		gold: handleAcoliteGold,
		xp: handleAcoliteXperience,
		new_user: handleNewAcolite,
		responseEvent: handleArtifacts,
		responseVerify: handleVerify
	}

	return null;
}

export default SocketListener