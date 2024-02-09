/** Represent the structure of a node which will link to one another 
 * to create a link list
 */
class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}
/** this uses the Node class and create a logic to implemet operations of link list
 * 
 */
class LinkedList{
    constructor(){
        this.head = null 
        this.size = 0
    }


    /** push an element at the end of link list
     * 
     * @param {Number} element  value to insert
     */
    // to add at last location
    add(element){
        let temp = new Node(element)
        let curr = this.head
        if(this.head==null){
            this.head = temp
        }
        else{
            while(curr.next){
                curr = curr.next
            }
            curr.next = temp
        }
        this.size++
    }


    /** push element at specified location
     * 
     * @param {Number} index index to insert the value at
     * @param {Number} element value to insert
     */
    // to add at any index 
    addAt(index,element){
        if(index<0||index>this.size){
            console.log("Enter correct index");
        }

        else{
            let node = new Node(element)
            let curr = this.head
            let prev
            if(index==0){
                node.next = curr
                this.head = node
            }
            else if(index==1){
                node.next = curr
                this.head = node
            }
            else{
                let iterator = 1
                while(iterator!=index){
                    prev = curr
                    curr = curr.next
                    iterator++
                }
                prev.next = node
                node.next = curr
                this.size++

            }

        }

    }


    /** to perform pop
     * 
     * @returns {Number}  poped element
     */
    // to remove element from last 
    removeLast(){
        let temp = this.head
        let curr 
        if(this.head==null){
            console.log("Linked list is empty");
            return 
        }
        else{
            while(temp.next){
                curr = temp
                temp = temp.next
                
            }
            curr.next = null
            this.size--
            return temp.data

        }

    }


    /** remove by value from a linklist
     
     * @param {Number} element value you want to remove
     
     */
    // to pop by values
    remove(element){
        if(this.head==null){
            console.log("List is empty");
            return
        }
        else if(this.head.data == element){
            this.head == null
        }
        else{
            let curr =this.head
            let prev

            while(curr.data!=element){
                prev = curr
                curr = curr.next
            }
            prev.next = curr.next
            this.size--
        }
        
    }


    /** to pop by index
     * 
     * @param {Number} index index at which you want pop operation
     
     */
    removeAt(index){
        if(index<0|| index>this.size){
            console.log("Enter proper index");
            return
        }
        if(index==1){
            this.head = curr.next
            return
        }
        let prev
        let curr = this.head
        let iterator = 1
        while(iterator!=index){
            prev = curr
            curr= curr.next
            iterator++
        }
        prev.next = curr.next
        this.size--
    }


    /** search for element in linklist
     
     * @param {Number} element  value you want to search
     * @returns {Boolean} true if present
     */
    // to search for existance of element 
    search(element){
        if(this.head ==null){
            console.log("List is empty");
            return false
        }
        let curr = this.head
        let count = 1
        while(curr.data!=element && curr){
            curr = curr.next

        }
        if(curr){
            return true
        }
        return false
    }

    
    // to print the linked list 
    /**prints a link list
     */
    print(){
        let temp = this.head
        if(this.head==null){
            console.log("list is empty");
            return
        }
        
        else{
            while(temp){
                console.log(temp.data);
                temp=temp.next
            }
        }

    }

    
}

let ll = new LinkedList()
ll.add(3)

ll.add(4)
ll.add(6)
ll.add(7)
ll.add(8)
ll.addAt(2,5)
ll.removeLast()
ll.print()
ll.removeAt(2)
ll.print()
