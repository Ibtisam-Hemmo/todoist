import { useState, useEffect } from 'react';
import { firebase } from '../Firebase';
import { collectedTasksExist } from '../helpers';
import moment from 'moment';

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('useId', '==', '313020ae-a19e-11ed-a8fc-0242ac120002');

        unsubscribe = selectedProject && !collectedTasksExist(selectedProject)
            ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
            : selectedProject === 'TODAY'
                ? (unsubscribe = unsubscribe.where(
                    'date',
                    '==',
                    moment().format('DD/MM/YYYY')))
                : selectedProject === 'INBOX' || selectedProject === 0
                    ? (unsubscribe = super.where('date', '==', ''))
                    : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }))
            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
                            && task.archived !== true
                    )
                    : newTasks.filter(task => task.archived !== true)
            );
            setArchivedTasks(newTasks.filter(task => task.archived !== false))
        });

        return () => unsubscribe();

    }, [selectedProject]);

    return { tasks, archivedTasks };
};

// const selectedProject = 1;
// const { tasks, archivedTasks } = useTasks(selectedProject);

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', '313020ae-a19e-11ed-a8fc-0242ac120002')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects)
                }
            });
    }, [projects]);
    
    return { projects, setProjects };
};