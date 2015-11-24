import java.io.*;
import java.util.*;

public class ProductSimilarBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("amazon-meta.txt");
      File outputFile = new File("ProductSimilar.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      StringTokenizer myStringTokenizer;
      int reviewCount = 0;
      String currentId = null;
      String currentSimilar = null;
   
      while((currentLine = myBufferedReader.readLine())!=null) {

         if(currentLine.contains("Id:")) {
            currentId = currentLine.substring(currentLine.lastIndexOf(" "));
         }
         
         if(currentLine.contains("similar:")) {
        	currentLine = currentLine.replaceAll("\\s+", " ");
        	String[] stringWords = currentLine.split(" ");
        	for(int i=3;i<stringWords.length;i++) {
        		currentSimilar = stringWords[i];
        		System.out.println(currentId+"\t"+currentSimilar);
            myBufferedWriter.write(currentId+"\t"+currentSimilar);
            myBufferedWriter.newLine();
        	}
         }
              
      }

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}