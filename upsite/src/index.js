import React from 'react';
import { createRoot } from 'react-dom/client';
import Site from "./site"
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Site />);