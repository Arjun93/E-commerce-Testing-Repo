import java.io.*;
import java.util.*;

public class ProductBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("amazon-meta.txt");
      File outputFile = new File("Product.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      
      /*LinkedList idLinkedList = new LinkedList();
      LinkedList asinLinkedList = new LinkedList();
      LinkedList titleLinkedList = new LinkedList();
      LinkedList groupLinkedList = new LinkedList();
      LinkedList salesRankLinkedList = new LinkedList();
      LinkedList similarLinkedList = new LinkedList();
      LinkedList categoriesLinkedList = new LinkedList();*/
      
      String currentId = null;
      String currentASIN = null;
      String currentTitle = null;
      String currentGroup = null;
      String currentSalesRank = null;
      String currentSimilar = null;
      String currentCategories = null;
      

      while((currentLine = myBufferedReader.readLine())!=null) {
         
         if(currentLine.contains("Id:")) {
            currentId = currentLine.substring(currentLine.lastIndexOf(" "));
            //idLinkedList.add(currentId);
         }
         if(currentLine.contains("ASIN:")) {
            currentASIN = currentLine.substring(currentLine.lastIndexOf(" "));
            //asinLinkedList.add(currentASIN);
         }
         
         if(currentLine.contains("title:")) {
            currentTitle = currentLine.substring(currentLine.indexOf(": ")+1);
            //titleLinkedList.add(currentTitle);
         }
         if(currentLine.contains("group:")) {
            currentGroup = currentLine.substring(currentLine.lastIndexOf(": ")+1);
            //groupLinkedList.add(currentGroup);
         }
         if(currentLine.contains("salesrank:")) {
            currentSalesRank = currentLine.substring(currentLine.lastIndexOf(": ")+1);
            //salesRankLinkedList.add(currentSalesRank);
         }
         if(currentLine.contains("similar:")) {
            currentLine = currentLine.replaceAll("\\s+", " "); 
            String[] similarWords = currentLine.split(" ");
            //System.out.println(similarWords[2]);
            currentSimilar = similarWords[2];
            //similarLinkedList.add(currentSimilar);
         }
         if(currentLine.contains("categories:")) {
            currentCategories = currentLine.substring(currentLine.lastIndexOf(" ")+1);;
            //categoriesLinkedList.add(currentCategories);
            stringToBeWritten = currentId +"\t"+currentASIN +"\t"+currentTitle +"\t"+currentGroup +"\t"+currentSalesRank +"\t"+currentSimilar +"\t"+currentCategories;
            System.out.println(stringToBeWritten);
            myBufferedWriter.write(stringToBeWritten);
            myBufferedWriter.newLine();
         }
      }

      /*for(int i=0; i<idLinkedList.size();i++) {
         stringToBeWritten = idLinkedList.get(i)+ "\t"+asinLinkedList.get(i)+ "\t"+titleLinkedList.get(i)+"\t"+groupLinkedList.get(i)+"\t"+salesRankLinkedList.get(i)+"\t"+similarLinkedList.get(i)+"\t"+categoriesLinkedList.get(i);
         System.out.println(stringToBeWritten);
         //myBufferedWriter.write(stringToBeWritten);
         //myBufferedWriter.newLine();
      }*/

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}
