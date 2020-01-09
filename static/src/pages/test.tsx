import * as React from 'react';
import { Upload, Icon, Modal } from 'antd';
const {useEffect, useState} = React;
const Test = () => {
	const [test, setTest] = useState('1')
    
    const handleTestClick = () => {
        setTest('3')
        console.log(12345);
		// window.removeEventListener('click')
		const key = 'click';
		for (key in window.getEventListeners(window)) {
			window.getEventListeners(window)[key].forEach(function(c) {
			  c.remove()
			})   
		}
    }
    useEffect(()=> {
		console.log('useEffect')
		const listener = () => {
			console.log(123456);
			setTest('2')
		}
        window.addEventListener('click', listener)
        return () => {
            window.removeEventListener('click', listener)
        }
    }, [])
	return (
		<div onClick={handleTestClick}>wertyui{test}</div>
	)
}

export default Test;