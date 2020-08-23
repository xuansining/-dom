window.dom = {
    //创建一个节点
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim() //把字符串两边的空格去掉
        return container.content.firstChild
    },
    //在某个节点后面插入一个节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    //在某个节点前面插入一个节点
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    //插入子节点
    append(parent, node) {
        parent.appendChild(node)
    },
    //在外面包裹一个父节点
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node;
    },
    empty(node) {
        let array = []

        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array

    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)

        } else if (arguments.length == 2) {
            return node.getAttribute(name)
        } else {

        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }

        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {

                return node.textContent
            }

        }


    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }

    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }

    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    //Array.from将伪数组转化成数组
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {

        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = node.parentNode.children
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}