import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { URLs } from './apis';
import { v4 as uuidv4 } from 'uuid'; // For generating unique ids

import { createNode, initialNodes, nodeTypes } from './utils/const';
import { FaShare, FaTableList } from 'react-icons/fa6';
import { RiFocus2Fill } from 'react-icons/ri';
import { IoMdMusicalNote } from 'react-icons/io';
import { Sidebar } from './components';

const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [mealData, setMealData] = useState<any>({});
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.type === 'start') {
      handleExploreClick(node);
    } else if (node.data.type === 'category') {
      const { node: newNode, edge: newEdge } = createNode(
        'View Meals',
        'action',
        <FaShare className='text-green-300' />,
        node.position.x + 200,
        node.position.y + 150,
        node.id,
        uuidv4(),
        `${node?.data?.label}-${uuidv4()}`
      );
      setNodes((nds: any) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
    } else if (node.data.label === 'View Meals') {
      fetchMeals(node);
    } else if (node.data.type === 'meal') {
      fetchMealDetails(node);
    } else if (node.data.type === 'details') {
      FetchDetails(node);
    } else if (node.data.type === 'ingredients') {
      const startX = node.position.x + 200;
      let startY = node.position.y + 150;
      const { node: newNode, edge: newEdge } = createNode(
        'View Meals',
        'ingredient',
        <FaShare className='text-green-300' />,
        startX,
        startY,
        node.id,
        uuidv4(),
        `${node?.data?.label}-${uuidv4()}}`
      );
      setNodes((nds: any) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
    }
  };

  const handleExploreClick = async (node: Node) => {
    try {
      const response = await axios.get(URLs.getCategories);
      const startX = node.position.x + 200;
      let startY = node.position.y + 100;
      const verticalGap = 100;
      if (response.data?.meals?.length <= 0 || !response.data?.meals) {
        return alert('No categories found');
      }
      const newNodes = response.data?.meals
        ?.map((cat: any) => cat.strCategory)
        ?.slice(0, 5)
        ?.map((item: string, index: number) => {
          const positionY = startY + index * verticalGap;
          return createNode(
            item,
            'category',
            <FaTableList className='text-white bg-red-400 rounded p-1' />,
            startX,
            positionY,
            node.id,
            uuidv4()
          );
        });
      const newNodesArray = newNodes?.map(({ node }: any) => node);
      const newEdgesArray = newNodes?.map(({ edge }: any) => edge);
      setNodes((nds) => [...nds, ...(newNodesArray || [])]);
      setEdges((eds) => [...eds, ...(newEdgesArray || [])]);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchMeals = async (node: Node) => {
    try {
      const categoryId = node?.id?.split('-')[0];
      const [response, byIngredientResponse, byAreaResponse] =
        await Promise.all([
          axios.get(URLs.getFoodbyCategory(categoryId)),
          axios.get(URLs.getFoodbyIngredient(categoryId)),
          axios.get(URLs.getFoodByArea(categoryId)),
        ]);
      const data =
        response.data?.meals ||
        byIngredientResponse.data?.meals ||
        byAreaResponse.data?.meals;
      const startX = node.position.x + 200;
      let startY = node.position.y + 150;
      const verticalGap = 100;
      if (!data) {
        return alert('No meals found');
      }
      const newNodes = data.slice(0, 4).map((meal: any, index: number) => {
        const positionY = startY + index * verticalGap;
        return createNode(
          meal.strMeal,
          'meal',
          <RiFocus2Fill className='text-white bg-cyan-500 rounded p-1' />,
          startX,
          positionY,
          node.id,
          uuidv4(),
          `${meal?.idMeal}-${uuidv4()}`
        );
      });
      const newNodesArray = newNodes?.map(({ node }: any) => node);
      const newEdgesArray = newNodes?.map(({ edge }: any) => edge);
      setNodes((nds) => [...nds, ...(newNodesArray || [])]);
      setEdges((eds) => [...eds, ...(newEdgesArray || [])]);
    } catch (error) {
      console.error('Error fetching meals', error);
    }
  };

  const fetchMealDetails = (node: Node) => {
    const { node: ingredientNode, edge: ingredientEdge } = createNode(
      'View Ingredients',
      'details',
      <FaShare className='text-green-300' />,
      node.position.x + 250,
      node.position.y + 50,
      node.id,
      uuidv4(),
      `${node?.id}-${uuidv4()}`
    );
    const { node: tagsNode, edge: tagsEdge } = createNode(
      'View Tags',
      'details',
      <FaShare className='text-green-300' />,
      node.position.x + 250,
      node.position.y + 150,
      node.id,
      uuidv4(),
      `${node?.id}-${uuidv4()}`
    );
    const { node: detailsNode, edge: detailsEdge } = createNode(
      'View Details',
      'details',
      <FaShare className='text-green-300' />,
      node.position.x + 250,
      node.position.y + 250,
      node.id,
      uuidv4(),
      `${node?.id}-${uuidv4()}`
    );
    setNodes((nds: any) => [...nds, ingredientNode, tagsNode, detailsNode]);
    setEdges((eds) => [...eds, ingredientEdge, tagsEdge, detailsEdge]);
  };
  const FetchDetails = async (node: Node) => {
    try {
      const response = await axios.get(
        URLs.getFoodbyId(node?.id?.split('-')[0])
      );
      if (!response?.data?.meals?.[0]) {
        return alert('No details found');
      }
      const anyFiveIngredients = [];
      for (let i = 5; i <= 9; i++) {
        const ingredient = response?.data?.meals?.[0][`strIngredient${i}`];
        if (ingredient) {
          anyFiveIngredients.push(ingredient);
        }
      }
      const startX = node.position.x + 250;
      let startY = node.position.y + 150;
      const verticalGap = 100;
      if (node.data?.label === 'View Ingredients') {
        const newNodes = anyFiveIngredients?.map((meal: any, index: number) => {
          const positionY = startY + index * verticalGap;
          return createNode(
            meal,
            'ingredients',
            <IoMdMusicalNote className='text-white bg-pink-600 rounded p-1' />,
            startX,
            positionY,
            node.id,
            uuidv4(),
            `${meal}-${uuidv4()}`
          );
        });
        const newNodesArray = newNodes?.map(({ node }: any) => node);
        const newEdgesArray = newNodes?.map(({ edge }: any) => edge);
        setNodes((nds) => [...nds, ...(newNodesArray || [])]);
        setEdges((eds) => [...eds, ...(newEdgesArray || [])]);
      }
      if (node.data?.label === 'View Tags') {
        if (!response?.data?.meals[0]?.strTags) {
          return alert('No tags found');
        }
        const newNodes = response?.data?.meals[0]?.strTags
          ?.split(',')
          ?.map((meal: any, index: number) => {
            const positionY = startY + index * verticalGap;
            return createNode(
              meal,
              'ingredients',
              <IoMdMusicalNote className='text-white bg-pink-600 rounded p-1' />,
              startX,
              positionY,
              node.id,
              uuidv4(),
              `${meal}-${uuidv4()}`
            );
          });
        const newNodesArray = newNodes?.map(({ node }: any) => node);
        const newEdgesArray = newNodes?.map(({ edge }: any) => edge);
        setNodes((nds) => [...nds, ...(newNodesArray || [])]);
        setEdges((eds) => [...eds, ...(newEdgesArray || [])]);
      }
      if (node.data?.label === 'View Details') {
        setMealData(response?.data?.meals[0]);
        setTimeout(() => {
          setIsOpen(true);
        });
      }
    } catch (error) {
      console.error('Error fetching details', error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className='h-screen w-screen'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {isOpen && (
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          mealsData={mealData}
        />
      )}
    </div>
  );
}

export default App;
