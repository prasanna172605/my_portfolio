import os

def fix_imports(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove unused React imports
    content = content.replace("import React, { useState } from 'react';", "import { useState } from 'react';")
    content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import { useState, useEffect, useRef } from 'react';")
    content = content.replace("import React, { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';")
    content = content.replace("import React from 'react';", "")
    
    # Fix type imports from data
    content = content.replace("import { ThemeMode, DATA, CSS_STYLES } from './data';", "import { DATA, CSS_STYLES } from './data';\nimport type { ThemeMode } from './data';")
    content = content.replace("import { ChatMessage, SYSTEM_PROMPT } from '../data';", "import { SYSTEM_PROMPT } from '../data';\nimport type { ChatMessage } from '../data';")
    content = content.replace("import { ThemeMode } from '../data';", "import type { ThemeMode } from '../data';")
    content = content.replace("import { Skill } from '../data';", "import type { Skill } from '../data';")
    content = content.replace("import { Project, ThemeMode } from '../data';", "import type { Project, ThemeMode } from '../data';")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

src_dir = r"c:\Users\PRASANNA\prasanna-portfolio\src"
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            fix_imports(os.path.join(root, f))
